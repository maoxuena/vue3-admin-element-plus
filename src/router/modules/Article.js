import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/article',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/article/ranking',
  name: 'articleRanking', // 与权限对应
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import(/* webpackChunkName: "article" */ '@/views/article/ranking/index'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import(/* webpackChunkName: "article" */ '@/views/article/detail/index'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
