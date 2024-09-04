import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/authentication/LoginPage.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/authentication/SignupPage.vue')
  },
  {
    path: '/wordly/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/wordly/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'register',
        component: () => import('@/views/WordRegisterPage.vue')
      },
      {
        path: 'memory-test',
        component: () => import('@/views/MemoryTestPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
