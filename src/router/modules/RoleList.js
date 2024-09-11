import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/system',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/system/user',
  name: 'roleList', // 与权限对应
  meta: {
    title: 'systemManage',
    icon: 'personnel'
  },
  children: [
    {
      path: '/system/role',
      component: () => import(/* webpackChunkName: "role" */ '@/views/system/role/index'),
      meta: {
        title: 'roleManage',
        icon: 'role'
      }
    }
  ]
}
