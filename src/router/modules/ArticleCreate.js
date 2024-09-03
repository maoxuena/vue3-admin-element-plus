import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/article',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/article/ranking',
  name: 'articleCreate', // 与权限对应
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () => import(/* webpackChunkName: "article-create" */ '@/views/article/create/index'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import(/* webpackChunkName: "article-create" */ '@/views/article/create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
