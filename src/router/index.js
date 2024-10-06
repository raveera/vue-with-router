import { createRouter, createWebHistory } from 'vue-router'
import localStorageUtil from '@/util/localStorage-util'
import RegisterView from '@/views/user/RegisterView.vue'
import LoginView from '@/views/user/LoginView.vue'
import RecordListView from '@/views/record/RecordListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/record/:id',
      name: 'record',
      component: RecordListView,
      meta: {
        requireAuth: true
      },
      // children: [
      //   { path: '/create', component: ''},
      //   { path: '/edit', component: ''}
      // ]
    }
  ]
})

router.beforeEach((to, from, next) => { 
  if (to.meta.requireAuth) {
    const token = localStorageUtil.get('userId')

    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
