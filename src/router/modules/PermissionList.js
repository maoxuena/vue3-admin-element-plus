import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/system',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/system/user',
  name: 'permissionList', // 与权限对应
  meta: {
    title: 'systemManage',
    icon: 'personnel'
  },
  children: [
    {
      path: '/system/permission',
      component: () => import(/* webpackChunkName: "permission" */ '@/views/system/permission/index'),
      meta: {
        title: 'permissionManage',
        icon: 'permission'
      }
    }
  ]
}
