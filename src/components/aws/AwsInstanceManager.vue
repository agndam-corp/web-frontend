<template>
  <div class="mt-8">
    <div class="shadow overflow-hidden sm:rounded-lg" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">AWS Instance Management</h2>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Instance
          </button>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="mb-4 p-4 rounded-md" 
             :class="theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-50 text-red-800'">
          <p>{{ errorMessage }}</p>
        </div>
        
        <!-- Notification message -->
        <div v-if="message" class="mb-4 p-4 rounded-md" 
             :class="{
               'bg-green-900 text-green-100': messageType === 'success' && theme === 'dark',
               'bg-green-50 text-green-800': messageType === 'success' && theme === 'light',
               'bg-red-900 text-red-100': messageType === 'error' && theme === 'dark',
               'bg-red-50 text-red-800': messageType === 'error' && theme === 'light',
               'bg-yellow-900 text-yellow-100': messageType === 'warning' && theme === 'dark',
               'bg-yellow-50 text-yellow-800': messageType === 'warning' && theme === 'light',
               'bg-blue-900 text-blue-100': messageType === 'info' && theme === 'dark',
               'bg-blue-50 text-blue-800': messageType === 'info' && theme === 'light'
             }">
          <p>{{ message }}</p>
        </div>

        <!-- Instances table -->
        <div v-if="!loading && instances.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
            <thead :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Instance ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Region</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Actions</th>
              </tr>
            </thead>
            <tbody :class="theme === 'dark' ? 'divide-gray-700 bg-gray-700' : 'divide-gray-200 bg-white'">
              <tr v-for="instance in instances" :key="instance.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ instance.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ instance.instanceId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getRegionDisplayName(instance.region) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': instance.status === 'running',
                      'bg-red-100 text-red-800': instance.status === 'stopped',
                      'bg-yellow-100 text-yellow-800': instance.status === 'pending' || instance.status === 'stopping'
                    }"
                  >
                    {{ instance.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="startInstance(instance)"
                      :disabled="instance.status === 'running' || instance.status === 'pending'"
                      class="text-green-600 hover:text-green-900 disabled:opacity-50"
                    >
                      Start
                    </button>
                    <button
                      @click="stopInstance(instance)"
                      :disabled="instance.status === 'stopped' || instance.status === 'stopping'"
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Stop
                    </button>
                    <button
                      @click="getStatus(instance)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Status
                    </button>
                    <button
                      @click="editInstance(instance)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteInstance(instance)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state -->
        <div v-if="!loading && instances.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          <h3 class="mt-2 text-sm font-medium">No instances</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding a new AWS instance.</p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Instance Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium">
            {{ showEditModal ? 'Edit Instance' : 'Add New Instance' }}
          </h3>
        </div>
        <div class="px-6 py-4">
          <form @submit.prevent="saveInstance">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="currentInstance.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Instance ID</label>
              <input
                v-model="currentInstance.instanceId"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                v-model="currentInstance.region"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select a region</option>
                <option value="us-east-1">US East (N. Virginia) [us-east-1]</option>
                <option value="us-east-2">US East (Ohio) [us-east-2]</option>
                <option value="us-west-1">US West (N. California) [us-west-1]</option>
                <option value="us-west-2">US West (Oregon) [us-west-2]</option>
                <option value="eu-west-1">EU (Ireland) [eu-west-1]</option>
                <option value="eu-west-2">EU (London) [eu-west-2]</option>
                <option value="eu-west-3">EU (Paris) [eu-west-3]</option>
                <option value="eu-central-1">EU (Frankfurt) [eu-central-1]</option>
                <option value="ap-southeast-1">Asia Pacific (Singapore) [ap-southeast-1]</option>
                <option value="ap-southeast-2">Asia Pacific (Sydney) [ap-southeast-2]</option>
                <option value="ap-northeast-1">Asia Pacific (Tokyo) [ap-northeast-1]</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="currentInstance.description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            @click="showCreateModal = false; showEditModal = false"
            class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            @click="saveInstance"
            class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ showEditModal ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium">Confirm Delete</h3>
        </div>
        <div class="px-6 py-4">
          <p>Are you sure you want to delete the instance "{{ instanceToDelete?.name }}"?</p>
          <p class="mt-2 text-sm text-gray-500">This action cannot be undone.</p>
        </div>
        <div class="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            @click="showDeleteConfirm = false"
            class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { awsInstanceService } from '../../services/awsInstanceService'

export default {
  name: 'AwsInstanceManager',
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      instances: [],
      loading: false,
      errorMessage: '',
      message: '',
      messageType: 'success',
      showCreateModal: false,
      showEditModal: false,
      showDeleteConfirm: false,
      instanceToDelete: null,
      currentInstance: {
        name: '',
        instanceId: '',
        region: '',
        description: ''
      },
      editingInstanceId: null
    }
  },
  mounted() {
    this.loadInstances()
  },
  methods: {
    getRegionDisplayName(regionCode) {
      const regionMap = {
        'us-east-1': 'US East (N. Virginia) [us-east-1]',
        'us-east-2': 'US East (Ohio) [us-east-2]',
        'us-west-1': 'US West (N. California) [us-west-1]',
        'us-west-2': 'US West (Oregon) [us-west-2]',
        'eu-west-1': 'EU (Ireland) [eu-west-1]',
        'eu-west-2': 'EU (London) [eu-west-2]',
        'eu-west-3': 'EU (Paris) [eu-west-3]',
        'eu-central-1': 'EU (Frankfurt) [eu-central-1]',
        'ap-southeast-1': 'Asia Pacific (Singapore) [ap-southeast-1]',
        'ap-southeast-2': 'Asia Pacific (Sydney) [ap-southeast-2]',
        'ap-northeast-1': 'Asia Pacific (Tokyo) [ap-northeast-1]'
      };
      return regionMap[regionCode] || regionCode;
    },
    
    async loadInstances() {
      this.loading = true
      this.errorMessage = ''
      
      try {
        const data = await awsInstanceService.getUserInstances()
        this.instances = data
      } catch (error) {
        this.errorMessage = `Error loading instances: ${error.response?.data?.error || error.message}`
        console.error('Error loading instances:', error)
      } finally {
        this.loading = false
      }
    },
    
    async startInstance(instance) {
      try {
        await awsInstanceService.startInstance({ instanceId: instance.instanceId, region: instance.region })
        this.message = `Start command sent for instance ${instance.name}`
        this.messageType = 'success'
        // Only refresh the specific instance status after a delay, not the whole list immediately
        setTimeout(() => {
          this.getStatus(instance)
        }, 2000)
      } catch (error) {
        this.message = `Error starting instance ${instance.name}: ${error.response?.data?.error || error.message}`
        this.messageType = 'error'
        console.error('Error starting instance:', error)
      }
    },
    
    async stopInstance(instance) {
      try {
        await awsInstanceService.stopInstance({ instanceId: instance.instanceId, region: instance.region })
        this.message = `Stop command sent for instance ${instance.name}`
        this.messageType = 'success'
        // Only refresh the specific instance status after a delay, not the whole list immediately
        setTimeout(() => {
          this.getStatus(instance)
        }, 2000)
      } catch (error) {
        this.message = `Error stopping instance ${instance.name}: ${error.response?.data?.error || error.message}`
        this.messageType = 'error'
        console.error('Error stopping instance:', error)
      }
    },
    
    async getStatus(instance) {
      try {
        const response = await awsInstanceService.getInstanceStatus(instance.instanceId, instance.region)
        // Update the instance status in the list
        const index = this.instances.findIndex(i => i.id === instance.id)
        if (index !== -1) {
          this.instances[index].status = response.state
        }
        this.message = `Current status for ${instance.name}: ${response.state}`
        this.messageType = 'success'
      } catch (error) {
        this.message = `Error getting status for ${instance.name}: ${error.response?.data?.error || error.message}`
        this.messageType = 'error'
        console.error('Error getting instance status:', error)
      }
    },
    
    editInstance(instance) {
      this.currentInstance = { ...instance }
      this.editingInstanceId = instance.id
      this.showEditModal = true
    },
    
    deleteInstance(instance) {
      this.instanceToDelete = instance
      this.showDeleteConfirm = true
    },
    
    async confirmDelete() {
      if (!this.instanceToDelete) return
      
      try {
        await awsInstanceService.deleteInstance(this.instanceToDelete.id)
        // Remove the instance from the list
        this.instances = this.instances.filter(i => i.id !== this.instanceToDelete.id)
        this.showDeleteConfirm = false
        this.instanceToDelete = null
      } catch (error) {
        this.errorMessage = `Error deleting instance: ${error.response?.data?.error || error.message}`
        console.error('Error deleting instance:', error)
      }
    },
    
    async saveInstance() {
      try {
        if (this.showEditModal) {
          // Update existing instance
          await awsInstanceService.updateInstance(this.editingInstanceId, this.currentInstance)
        } else {
          // Create new instance
          await awsInstanceService.createInstance(this.currentInstance)
        }
        
        // Close modal and reset form
        this.showCreateModal = false
        this.showEditModal = false
        this.currentInstance = {
          name: '',
          instanceId: '',
          region: '',
          description: ''
        }
        this.editingInstanceId = null
        
        // Reload instances
        await this.loadInstances()
      } catch (error) {
        this.errorMessage = `Error saving instance: ${error.response?.data?.error || error.message}`
        console.error('Error saving instance:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>