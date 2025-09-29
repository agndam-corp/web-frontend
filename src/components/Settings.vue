<template>
  <div class="min-h-screen flex flex-col" :class="themeClass">
    <header class="shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold">VPN Control Panel</h1>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <span class="mr-2">Light</span>
            <button 
              @click="toggleTheme"
              class="relative inline-flex h-6 w-11 items-center rounded-full"
              :class="theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'"
            >
              <span class="sr-only">Toggle theme</span>
              <span 
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                :class="theme === 'dark' ? 'translate-x-6' : 'translate-x-1'"
              ></span>
            </button>
            <span class="ml-2">Dark</span>
          </div>
          <button 
            @click="logout"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
    <main class="flex-grow">
      <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <h2 class="text-2xl font-bold mb-6" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">Settings</h2>
      
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
    </main>
  </div>
</template>

<script>
import { authService } from '../services/authService'

export default {
  name: 'Settings',
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
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',
      user: {}
    }
  },
  computed: {
    themeClass() {
      return `theme-${this.theme}`
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
    toggleTheme() {
      const newTheme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      this.theme = newTheme
    },
    logout() {
      // Use auth service to handle logout
      authService.logout()
      // Redirect to login
      window.location.href = '/login'
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
/* Apply theme variables */
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Header styles */
header {
  background-color: var(--bg-secondary, #2d3748);
  color: var(--text-primary, #f7fafc);
}

/* Theme variables */
.theme-dark {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --border-color: #4a5568;
  --button-primary: #4299e1;
  --button-primary-hover: #3182ce;
  --button-danger: #e53e3e;
  --button-danger-hover: #c53030;
  --button-success: #48bb78;
  --button-success-hover: #38a169;
  --status-running: #48bb78;
  --status-stopped: #e53e3e;
  --status-pending: #ed8936;
}

.theme-light {
  --bg-primary: #f7fafc;
  --bg-secondary: #edf2f7;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #cbd5e0;
  --button-primary: #4299e1;
  --button-primary-hover: #3182ce;
  --button-danger: #e53e3e;
  --button-danger-hover: #c53030;
  --button-success: #48bb78;
  --button-success-hover: #38a169;
  --status-running: #48bb78;
  --status-stopped: #e53e3e;
  --status-pending: #ed8936;
}
</style>