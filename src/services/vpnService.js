// src/services/vpnService.js
import apiClient from './api';

export const vpnService = {
  // Get VPN instance status - accepts optional params for specific instance
  async getStatus(params = {}) {
    try {
      // If no params provided (when called from MainApp initially), call with no params
      // If params provided (when called for specific instance), use query parameters
      let url = '/status';
      if (params.instanceId || params.region) {
        const queryParams = [];
        if (params.instanceId) {
          queryParams.push(`instanceId=${encodeURIComponent(params.instanceId)}`);
        }
        if (params.region) {
          queryParams.push(`region=${encodeURIComponent(params.region)}`);
        }
        url += '?' + queryParams.join('&');
      }
      
      const response = await apiClient.get(url);
      console.log('VPN service: Status retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Get status error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  },

  // Start VPN instance
  async startInstance(params = {}) {
    try {
      const payload = {};
      if (params.instanceId) payload.instanceId = params.instanceId;
      if (params.region) payload.region = params.region;
      
      const response = await apiClient.post('/start', payload);
      console.log('VPN service: Start instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Start instance error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  },

  // Stop VPN instance
  async stopInstance(params = {}) {
    try {
      const payload = {};
      if (params.instanceId) payload.instanceId = params.instanceId;
      if (params.region) payload.region = params.region;
      
      const response = await apiClient.post('/stop', payload);
      console.log('VPN service: Stop instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('VPN service: Stop instance error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  }
};