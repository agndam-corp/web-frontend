// src/services/api.js
import axios from 'axios';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://api.djasko.com',  // Backend API endpoint
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API service: Making request to', config.url);
    return config;
  },
  error => {
    console.error('API service: Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => {
    console.log('API service: Response from', response.config.url);
    return response;
  },
  error => {
    console.log('API service: Error response from', error.config?.url, 'Status:', error.response?.status);
    
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid, try to refresh
      return refreshToken().then(newToken => {
        // Update the authorization header with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(error.config); // Retry the original request
      }).catch((refreshError) => {
        console.error('API service: Token refresh failed:', refreshError);
        // Clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('token_expires_at');
        window.location.href = '/login';
        return Promise.reject(error);
      });
    }
    return Promise.reject(error);
  }
);

// Function to refresh the access token using the refresh token
async function refreshToken() {
  console.log('API service: Token refresh function called');
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('API service: Refresh token from local storage:', refreshToken ? 'exists' : 'not found');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post('/refresh', {
      refresh_token: refreshToken
    });
    
    console.log('API service: Token refresh response:', response.data);
    
    // Update tokens in localStorage
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    
    // Update expiration
    const expiresIn = response.data.expires_in || 900; // Default to 15 minutes
    const expirationTime = new Date().getTime() + (expiresIn * 1000);
    localStorage.setItem('token_expires_at', expirationTime.toString());
    
    console.log('API service: Tokens updated in local storage');
    return response.data.access_token;
  } catch (error) {
    console.error('API service: Token refresh failed:', error);
    throw error;
  }
}

export default apiClient;