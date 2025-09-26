import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'

// Set up axios to include JWT token in requests if available
// Point to the backend API URL
axios.defaults.baseURL = 'https://api.djasko.com'  // Backend API endpoint

// Function to refresh the access token using the refresh token
async function refreshToken() {
  console.log('Token refresh function called');
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    console.log('Refresh token from local storage:', refreshToken ? 'exists' : 'not found');
    
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }
    
    const response = await axios.post('/refresh', {
      refresh_token: refreshToken
    })
    
    console.log('Token refresh response:', response.data);
    
    // Update tokens in localStorage
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('refresh_token', response.data.refresh_token)
    
    // Update expiration
    const expiresIn = response.data.expires_in || 900; // Default to 15 minutes
    const expirationTime = new Date().getTime() + (expiresIn * 1000)
    localStorage.setItem('token_expires_at', expirationTime.toString())
    
    console.log('Tokens updated in local storage');
    return response.data.access_token
  } catch (error) {
    console.error('Token refresh failed:', error)
    // Clear tokens and redirect to login
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('token_expires_at')
    window.location.href = '/login'
    throw error
  }
}

// Add a request interceptor to include the JWT token
axios.interceptors.request.use(
  config => {
    console.log('Request interceptor: Making request to', config.url);
    const token = localStorage.getItem('access_token')
    const tokenExpiresAt = localStorage.getItem('token_expires_at')
    
    console.log('Request interceptor: Token exists:', !!token, 'Expires at:', tokenExpiresAt);
    
    // Check if token is expired
    if (tokenExpiresAt && new Date().getTime() > parseInt(tokenExpiresAt)) {
      console.log('Request interceptor: Token is expired, attempting refresh');
      // Token is expired, try to refresh it
      return refreshToken().then(newToken => {
        console.log('Request interceptor: Token refreshed successfully');
        config.headers.Authorization = `Bearer ${newToken}`
        return config
      }).catch(() => {
        // Refresh failed, return original config with expired token
        // The response interceptor will handle the 401
        console.log('Request interceptor: Token refresh failed');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      })
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Request interceptor: Added token to request');
    }
    return config
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token expiration
axios.interceptors.response.use(
  response => {
    console.log('Response interceptor: Successful response from', response.config.url);
    return response
  },
  error => {
    console.log('Response interceptor: Error response from', error.config?.url, 'Status:', error.response?.status);
    
    if (error.response && error.response.status === 401) {
      console.log('Response interceptor: 401 received, attempting token refresh');
      // Token might be expired or invalid, try to refresh
      const refreshToken = localStorage.getItem('refresh_token')
      console.log('Response interceptor: Refresh token exists:', !!refreshToken);
      
      if (refreshToken && error.config && !error.config._retry) {
        console.log('Response interceptor: Attempting token refresh for original request');
        // Mark this request as retry to prevent infinite loop
        error.config._retry = true
        
        // Try to refresh the token and retry the original request
        return refreshToken().then(newToken => {
          console.log('Response interceptor: Token refreshed, retrying original request');
          // Update the authorization header with the new token
          error.config.headers.Authorization = `Bearer ${newToken}`
          return axios(error.config) // Retry the original request
        }).catch((refreshError) => {
          console.error('Response interceptor: Token refresh failed during error handling:', refreshError);
          // Refresh failed, redirect to login
          window.location.href = '/login'
          return Promise.reject(error)
        })
      } else {
        console.log('Response interceptor: No refresh token or already retried, redirecting to login');
        // Either no refresh token, or already retried, redirect to login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('role')
        localStorage.removeItem('username')
        localStorage.removeItem('token_expires_at')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

createApp(App).use(router).mount('#app')