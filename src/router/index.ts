import { useAuthStore } from '@/stores/authStore'
import DashboardView from '@/views/DashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: { layout: 'app', requiresAuth: true, title: 'Dashboard' },
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('../views/AllDealsView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Deals' },
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('../views/CustomersView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Customers' },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Tasks' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Settings' },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Calendar' },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue'),
      meta: { layout: 'app', requiresAuth: true, title: 'Notifications' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'auth', title: 'Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'auth', title: 'Register' },
    },
    {
      path: '/deal/:id',
      name: 'deal',
      component: () => import('../views/DealView.vue'),
      props: true,
      meta: { layout: 'app', requiresAuth: true, title: `Deal Details` },
    },
    {
      path: '/customer/:cid',
      name: 'customer',
      component: () => import('../views/CustomerDetailsView.vue'),
      props: true,
      meta: { layout: 'app', requiresAuth: true, title: 'Customer Details' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  document.title = to.meta.title ? String(to.meta.title) : 'Мое приложение'

  if (requiresAuth && !auth.isAuth) next('/login')
  else if (!requiresAuth && auth.isAuth && to.meta.layout === 'auth') next('/')
  else next()
})

export default router
