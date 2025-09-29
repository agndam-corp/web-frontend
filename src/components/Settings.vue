<template>
  <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="text-2xl font-bold mb-6" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">Settings</h2>
      
      <!-- User Information Section -->
      <div class="shadow overflow-hidden sm:rounded-lg mb-8" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
        <div class="px-4 py-5 sm:px-6 border-b" :class="theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'">
          <h3 class="text-lg leading-6 font-medium" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">User Information</h3>
          <p class="mt-1 max-w-2xl text-sm" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Personal details and account information</p>
        </div>
        <div class="border-b" :class="theme === 'dark' ? 'border-gray-700' : 'border-gray-200'">
          <dl>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'">
              <dt class="text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Username</dt>
              <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">{{ user.username || 'N/A' }}</dd>
            </div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
              <dt class="text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Email</dt>
              <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">{{ user.email || 'N/A' }}</dd>
            </div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'">
              <dt class="text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Role</dt>
              <dd class="mt-1 text-sm" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'" sm:mt-0 sm:col-span-2>
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" 
                      :class="theme === 'dark' ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'">
                  {{ user.role || 'N/A' }}
                </span>
              </dd>
            </div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
              <dt class="text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Account Created</dt>
              <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">{{ formatDate(user.createdAt) || 'N/A' }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Security Section -->
      <div class="shadow overflow-hidden sm:rounded-lg" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
        <div class="px-4 py-5 sm:px-6 border-b" :class="theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'">
          <h3 class="text-lg leading-6 font-medium" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">Security</h3>
          <p class="mt-1 max-w-2xl text-sm" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'">Change password and manage security settings</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="currentPassword" class="block text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                class="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'"
              />
            </div>

            <div class="sm:col-span-3">
              <label for="newPassword" class="block text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                class="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'"
              />
            </div>

            <div class="sm:col-span-3">
              <label for="confirmPassword" class="block text-sm font-medium" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                class="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'"
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
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
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
        // Get user info from auth service
        this.user = {
          username: authService.getUsername(),
          role: authService.getUserRole(),
          email: localStorage.getItem('user_email') || 'N/A', // Would come from API response
          createdAt: localStorage.getItem('user_created_at') || new Date().toISOString() // Would come from API
        }
      } catch (error) {
        console.error('Error loading user info:', error)
        this.user = {
          username: authService.getUsername(),
          role: authService.getUserRole(),
          email: 'N/A',
          createdAt: 'N/A'
        }
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

<style scoped>
/* Additional specific styles for settings page if needed */
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>