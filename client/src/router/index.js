import { createRouter, createWebHistory } from 'vue-router'
import AppDashboardView from '../views/AppDashboardView.vue'
import AppDashboardButtonsView from '../views/AppDashboardButtonsView.vue'
import AppDashboardCardsView from '../views/AppDashboardCardsView.vue'
import AppDashboardChartsView from '../views/AppDashboardChartsView.vue'
import AppDashboardComponentCodeView from '../views/AppDashboardComponentCodeView.vue'
import AppDashboardHomeView from '../views/AppDashboardHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app/dashboard',
    },
    {
      path: '/app',
      name: 'app',
      component: AppDashboardView,
      redirect: { name: 'app-dashboard-home' },
      children: [
        {
          path: 'dashboard',
          name: 'app-dashboard-home',
          component: AppDashboardHomeView,
        },
        {
          path: 'charts',
          name: 'app-dashboard-charts',
          component: AppDashboardChartsView,
        },
        {
          path: 'cards',
          name: 'app-dashboard-cards',
          component: AppDashboardCardsView,
        },
        {
          path: 'buttons',
          name: 'app-dashboard-buttons',
          component: AppDashboardButtonsView,
        },
        {
          path: 'component-code/:componentId',
          name: 'app-dashboard-component-code',
          component: AppDashboardComponentCodeView,
        },
      ],
    },
  ],
})

export default router
