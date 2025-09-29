import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import MainApp from './components/MainApp.vue'
import Registration from './components/Registration.vue'
import Settings from './components/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'MainApp',
    component: MainApp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Registration
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  
  // If trying to access main app without auth, redirect to login
  if (to.name === 'MainApp' && !accessToken) {
    next({ name: 'Login' })
  } 
  // If trying to access login while authenticated and going to root, redirect to main app
  else if ((to.name === 'Login' || to.name === 'Register') && accessToken && to.path === '/') {
    next({ name: 'MainApp' })
  } 
  // Otherwise, proceed normally
  else {
    next()
  }
})

export default router