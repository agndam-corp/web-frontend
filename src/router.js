import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import MainApp from './components/MainApp.vue'
import Registration from './components/Registration.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // If trying to access main app without auth, redirect to login
  if (to.name === 'MainApp' && !token) {
    next({ name: 'Login' })
  } 
  // If trying to access login while authenticated and going to root, redirect to main app
  else if ((to.name === 'Login' || to.name === 'Register') && token && to.path === '/') {
    next({ name: 'MainApp' })
  } 
  // Otherwise, proceed normally
  else {
    next()
  }
})

export default router