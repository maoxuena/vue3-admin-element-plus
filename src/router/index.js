import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    name: 'article',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        component: () =>
          import(/* webpackChunkName: "article" */ '@/views/article/ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        name: 'articleDetail',
        component: () =>
          import(/* webpackChunkName: "article" */ '@/views/article/detail/index'),
        meta: {
          title: 'articleDetail'
        }
      }
    ]
  },
  {
    path: '/system',
    component: layout,
    redirect: '/system/user',
    name: 'system',
    meta: {
      title: 'systemManage',
      icon: 'personnel'
    },
    children: [
      {
        path: '/system/user',
        name: 'systemUser',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/system/user/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/system/user/info/:id',
        name: 'userInfo',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/system/user/info/index'),
        props: true,
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/system/role',
        name: 'systemRole',
        component: () =>
          import(/* webpackChunkName: "role" */ '@/views/system/role/index'),
        meta: {
          title: 'roleManage',
          icon: 'role'
        }
      },
      {
        path: '/system/permission',
        name: 'systemPermission',
        component: () =>
          import(/* webpackChunkName: "permission" */ '@/views/system/permission/index'),
        meta: {
          title: 'permissionManage',
          icon: 'permission'
        }
      }
    ]
  }
]

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    children: [
      // 主页/仪表盘
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index'),
        meta: {
          title: 'dashboard',
          icon: 'el-icon-monitor'
        }
      },
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "error" */ '@/views/error/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () =>
          import(/* webpackChunkName: "error" */ '@/views/error/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
