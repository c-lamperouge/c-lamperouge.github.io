import { createRouter, createWebHistory } from 'vue-router'

import Test from '../views/Test.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    alias: '/Test',
    component: Test
  },
  {
    path: '/Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
