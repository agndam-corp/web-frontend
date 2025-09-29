<template>
  <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="text-2xl font-bold mb-6">Settings</h2>
      
      <!-- User Information Section -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Personal details and account information</p>
        </div>
        <div class="border-b border-gray-200 dark:border-gray-700">
          <dl>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Username</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ user.username || 'N/A' }}</dd>
            </div>
            <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ user.email || 'N/A' }}</dd>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Role</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {{ user.role || 'N/A' }}
                </span>
              </dd>
            </div>
            <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Account Created</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ formatDate(user.createdAt) || 'N/A' }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Security</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Change password and manage security settings</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div class="sm:col-span-3">
              <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div class="sm:col-span-3">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div class="mt-6">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/authService'

export default {
  name: 'Settings',
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    await this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      try {
        // Get user info from local storage since we don't have a dedicated API endpoint
        this.user = {
          username: authService.getUsername(),
          role: authService.getUserRole(),
          email: 'user@example.com', // This would come from the API in a real implementation
          createdAt: localStorage.getItem('user_created_at') || new Date().toISOString() // Would come from API
        }
      } catch (error) {
        console.error('Error loading user info:', error)
      }
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }
  }
}
</script>