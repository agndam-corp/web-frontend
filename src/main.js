import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
// Import the API service to ensure interceptors are set up
import './services/api'

createApp(App).use(router).mount('#app')