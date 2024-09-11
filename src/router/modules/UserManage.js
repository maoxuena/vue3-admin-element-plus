import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/system',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/system/user',
  name: 'userManage', // 与权限对应
  meta: {
    title: 'systemManage',
    icon: 'personnel'
  },
  children: [
    {
      path: '/system/user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/system/user/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/system/user/info/:id',
      component: () => import(/* webpackChunkName: "user" */ '@/views/system/user/info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    }
  ]
}
