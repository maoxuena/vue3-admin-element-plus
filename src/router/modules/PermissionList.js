import layout from '@/layout'

export default {
  path: '/system',
  component: layout,
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
