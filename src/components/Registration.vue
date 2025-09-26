<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" :class="themeClass">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold" :class="textClass">
        Create an Account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10" :class="cardClass">
        <form class="space-y-6" @submit.prevent="register">
          <div>
            <label for="username" class="block text-sm font-medium" :class="labelClass">
              Username
            </label>
            <div class="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                v-model="username"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="inputClass"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium" :class="labelClass">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="inputClass"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium" :class="labelClass">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                v-model="password"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="inputClass"
              />
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium" :class="labelClass">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                v-model="confirmPassword"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="inputClass"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-md p-4" :class="errorClass">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium">
                  {{ error }}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
              :class="buttonClass"
            >
              <span v-if="loading">Creating account...</span>
              <span v-else>Create Account</span>
            </button>
          </div>
        </form>
        
        <div class="mt-4 text-center">
          <p class="text-sm">
            Already have an account?
            <a href="/login" class="font-medium" :class="theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/authService'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false
    }
  },
  computed: {
    theme() {
      return localStorage.getItem('theme') || 'dark'
    },
    themeClass() {
      return `theme-${this.theme}`
    },
    cardClass() {
      return this.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    },
    textClass() {
      return this.theme === 'dark' ? 'text-white' : 'text-gray-900'
    },
    labelClass() {
      return this.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    },
    inputClass() {
      return this.theme === 'dark' ? 
        'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 
        'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    },
    errorClass() {
      return this.theme === 'dark' ? 
        'bg-red-900 text-red-100' : 
        'bg-red-50 text-red-800'
    },
    buttonClass() {
      return this.theme === 'dark' ? 
        'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-gray-800' : 
        'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-white'
    }
  },
  methods: {
    async register() {
      // Basic validation
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters'
        return
      }

      this.loading = true
      this.error = ''

      try {
        // Use the authentication service to register
        await authService.register({
          username: this.username,
          email: this.email,
          password: this.password
        })

        // On successful registration, redirect to login
        this.error = 'Registration successful! Redirecting to login...'
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } catch (err) {
        console.error('Registration error:', err)
        if (err.response) {
          // Server responded with error status
          this.error = err.response.data.error || `Registration failed (${err.response.status})`
        } else if (err.request) {
          // Request was made but no response received
          this.error = 'Network error - unable to reach the server'
        } else {
          // Something else happened
          this.error = 'An error occurred during registration: ' + err.message
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Apply theme variables */
.theme-dark {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --border-color: #4a5568;
  --button-primary: #4299e1;
  --button-primary-hover: #3182ce;
  --error-bg: #fed7d7;
  --error-text: #c53030;
}

.theme-light {
  --bg-primary: #f7fafc;
  --bg-secondary: #edf2f7;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #cbd5e0;
  --button-primary: #4299e1;
  --button-primary-hover: #3182ce;
  --error-bg: #fed7d7;
  --error-text: #c53030;
}

/* Ensure full background coverage */
.theme-dark {
  background-color: var(--bg-primary);
}

.theme-light {
  background-color: var(--bg-primary);
}
</style>