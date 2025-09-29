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
  
  // Protected routes (require authentication)
  const protectedRoutes = ['MainApp', 'Settings']
  
  if (protectedRoutes.includes(to.name) && !accessToken) {
    // If trying to access protected route without auth, redirect to login
    next({ name: 'Login' })
  } 
  else if ((to.name === 'Login' || to.name === 'Register') && accessToken) {
    // If authenticated and trying to access login/register, redirect to main app
    next({ name: 'MainApp' })
  }
  else {
    // Otherwise, proceed normally
    next()
  }
})

export default router