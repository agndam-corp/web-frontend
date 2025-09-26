// src/services/vpnService.js
import apiClient from './api';

export const vpnService = {
  // Get VPN instance status
  async getStatus() {
    try {
      const response = await apiClient.get('/status');
      console.log('VPN service: Status retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Get status error:', error);
      throw error;
    }
  },

  // Start VPN instance
  async startInstance() {
    try {
      const response = await apiClient.post('/start');
      console.log('VPN service: Start instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Start instance error:', error);
      throw error;
    }
  },

  // Stop VPN instance
  async stopInstance() {
    try {
      const response = await apiClient.post('/stop');
      console.log('VPN service: Stop instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Stop instance error:', error);
      throw error;
    }
  }
};