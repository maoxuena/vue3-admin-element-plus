import layout from '@/layout'
import empty from '@/layout/empty'

export default {
  path: '/charts',
  component: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__ ? empty : layout,
  redirect: '/charts/d3',
  name: '', // 与权限对应
  meta: {
    title: 'charts',
    icon: 'charts'
  },
  children: [
    {
      path: '/charts/d3',
      component: () => import(/* webpackChunkName: "d3" */ '@/views/charts/d3/index'),
      meta: {
        title: 'd3',
        icon: 'd3'
      }
    },
    {
      path: '/charts/eCharts',
      component: () => import(/* webpackChunkName: "eCharts" */ '@/views/charts/eCharts/index'),
      redirect: '/charts/eCharts/line',
      meta: {
        title: 'eCharts',
        icon: 'eCharts'
      },
      children: [
        {
          path: '/charts/eCharts/line',
          component: () => import(/* webpackChunkName: "eCharts" */ '@/views/charts/eCharts/line/index'),
          meta: {
            title: 'line',
            icon: 'line'
          }
        },
        {
          path: '/charts/eCharts/bar',
          component: () => import(/* webpackChunkName: "eCharts" */ '@/views/charts/eCharts/bar/index'),
          meta: {
            title: 'bar',
            icon: 'bar'
          }
        },
        {
          path: '/charts/eCharts/map',
          component: () => import(/* webpackChunkName: "eCharts" */ '@/views/charts/eCharts/map/index'),
          meta: {
            title: 'map',
            icon: 'map'
          }
        }
      ]
    }
  ]
}
