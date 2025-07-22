import { ref } from 'vue'
import type { TSidebar } from '../types/sidebarType'

export const SIDEBAR_DATA = ref<TSidebar[]>([
  {
    id: 0,
    title: 'Dashboard',
    icon: './Dashboard.png',
    path: '/',
  },
  {
    id: 1,
    title: 'Deals',
    icon: './Deals.png',
    path: '/deals',
  },
  {
    id: 2,
    title: 'Customers',
    icon: './Customers.png',
    path: '/customers',
  },
  {
    id: 3,
    title: 'Tasks',
    icon: './Tasks.png',
    path: '/tasks',
  },
  {
    id: 4,
    title: 'Calendar',
    icon: './Calendar.png',
    path: '/calendar',
  },
  {
    id: 5,
    title: 'Notifications',
    icon: './Notification.png',
    path: '/notifications',
  },
  {
    id: 6,
    title: 'Settings',
    icon: './Settings.png',
    path: '/settings',
  },
])
