// src/services/authService.js
import apiClient from './api';

export const authService = {
  // Login user and return tokens
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      // Store JWT tokens and user info in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', response.data.username);
      
      // Also store expiration time 
      const expiresIn = response.data.expires_in || 900; // Default to 15 minutes if not provided
      const expirationTime = new Date().getTime() + (expiresIn * 1000);
      localStorage.setItem('token_expires_at', expirationTime.toString());
      
      console.log('Auth service: Login successful, tokens stored');
      
      return response.data;
    } catch (error) {
      console.error('Auth service: Login error:', error);
      throw error;
    }
  },

  // Register a new user
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      console.log('Auth service: Registration successful');
      return response.data;
    } catch (error) {
      console.error('Auth service: Registration error:', error);
      throw error;
    }
  },

  // Refresh tokens
  async refreshTokens() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiClient.post('/auth/refresh', {
        refresh_token: refreshToken
      });
      
      // Update tokens in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      // Update expiration
      const expiresIn = response.data.expires_in || 900; // Default to 15 minutes
      const expirationTime = new Date().getTime() + (expiresIn * 1000);
      localStorage.setItem('token_expires_at', expirationTime.toString());
      
      console.log('Auth service: Tokens refreshed');
      
      return response.data;
    } catch (error) {
      console.error('Auth service: Token refresh error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    const tokenExpiresAt = localStorage.getItem('token_expires_at');
    
    if (!token || !tokenExpiresAt) {
      return false;
    }
    
    // Check if token is expired
    const isExpired = new Date().getTime() > parseInt(tokenExpiresAt);
    console.log('Auth service: Authentication check - token exists:', !!token, 'is expired:', isExpired);
    
    return !isExpired;
  },

  // Get user role
  getUserRole() {
    return localStorage.getItem('role') || null;
  },

  // Get username
  getUsername() {
    return localStorage.getItem('username') || null;
  },

  // Logout user
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('token_expires_at');
    console.log('Auth service: User logged out');
  },

  // Check auth status
  async checkAuthStatus() {
    try {
      const response = await apiClient.get('/auth/auth-check');
      return response.data;
    } catch (error) {
      console.error('Auth service: Auth status check error:', error);
      throw error;
    }
  }
};