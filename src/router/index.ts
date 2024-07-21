import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: () => import('@/views/home/HomePage.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/_cpns/HomeContent.vue')
        },
        {
          path: '/shop',
          name: '商城',
          component: () => import('@/views/ShopPage.vue')
        },
        {
          path: '/about',
          name: '关于我们',
          component: () => import('@/views/AboutUs.vue')
        }
      ]
    },
    {
      path: '/user',
      name: '用户',
      children: [
        {
          path: '/user/login',
          component: () => import('@/views/user/UserLoginView.vue')
        },
        {
          path: '/user/chat',
          component: () => import('@/views/ChatPage.vue')
        },
        {
          path: '/user/register',
          component: () => import('@/views/user/UserReigsterView.vue')
        },
      ]
    }
  ]
})

export default router
