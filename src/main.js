import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'

// Set up axios to include JWT token in requests if available
axios.defaults.baseURL = window.location.origin  // Use the same origin as the frontend

// Add a request interceptor to include the JWT token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token expiration
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid, redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('username')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

createApp(App).use(router).mount('#app')