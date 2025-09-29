// src/services/awsInstanceService.js
import apiClient from './api';

export const awsInstanceService = {
  // Get all instances owned by the current user
  async getUserInstances() {
    try {
      const response = await apiClient.get('/instances');
      console.log('AWS Instance service: User instances retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Get user instances error:', error);
      throw error;
    }
  },

  // Get a specific instance by ID
  async getInstance(id) {
    try {
      const response = await apiClient.get(`/instances/${id}`);
      console.log('AWS Instance service: Instance retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Get instance error:', error);
      throw error;
    }
  },

  // Create a new instance
  async createInstance(instanceData) {
    try {
      const response = await apiClient.post('/instances', instanceData);
      console.log('AWS Instance service: Instance created:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Create instance error:', error);
      throw error;
    }
  },

  // Update an existing instance
  async updateInstance(id, instanceData) {
    try {
      const response = await apiClient.put(`/instances/${id}`, instanceData);
      console.log('AWS Instance service: Instance updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Update instance error:', error);
      throw error;
    }
  },

  // Delete an instance
  async deleteInstance(id) {
    try {
      const response = await apiClient.delete(`/instances/${id}`);
      console.log('AWS Instance service: Instance deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Delete instance error:', error);
      throw error;
    }
  },

  // Start an AWS EC2 instance
  async startInstance(instanceId, region) {
    try {
      const response = await apiClient.post('/start', {
        instanceId: instanceId,
        region: region
      });
      console.log('AWS Instance service: Start instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Start instance error:', error);
      throw error;
    }
  },

  // Stop an AWS EC2 instance
  async stopInstance(instanceId, region) {
    try {
      const response = await apiClient.post('/stop', {
        instanceId: instanceId,
        region: region
      });
      console.log('AWS Instance service: Stop instance successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Stop instance error:', error);
      throw error;
    }
  },

  // Get the status of an AWS EC2 instance
  async getInstanceStatus(instanceId, region) {
    try {
      const response = await apiClient.get('/status', {
        params: {
          instanceId: instanceId,
          region: region
        }
      });
      console.log('AWS Instance service: Get status successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Get status error:', error);
      throw error;
    }
  },

  // Admin endpoints
  async getAdminInstances() {
    try {
      const response = await apiClient.get('/admin/instances');
      console.log('AWS Instance service: Admin instances retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Get admin instances error:', error);
      throw error;
    }
  },

  async createAdminInstance(instanceData) {
    try {
      const response = await apiClient.post('/admin/instances', instanceData);
      console.log('AWS Instance service: Admin instance created:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Create admin instance error:', error);
      throw error;
    }
  },

  async updateAdminInstance(id, instanceData) {
    try {
      const response = await apiClient.put(`/admin/instances/${id}`, instanceData);
      console.log('AWS Instance service: Admin instance updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Update admin instance error:', error);
      throw error;
    }
  },

  async deleteAdminInstance(id) {
    try {
      const response = await apiClient.delete(`/admin/instances/${id}`);
      console.log('AWS Instance service: Admin instance deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('AWS Instance service: Delete admin instance error:', error);
      throw error;
    }
  }
};