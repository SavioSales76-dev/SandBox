import { createRouter, createWebHistory } from 'vue-router'
import MainDashboardView from '../views/MainDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: MainDashboardView,
    },
  ],
})

export default router
