import layout from '@/layout'

export default {
  path: '/system',
  component: layout,
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
