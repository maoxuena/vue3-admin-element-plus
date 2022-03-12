// 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes (state, newRoutes) {
      // 在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     * @returns
     */
    filterRoutes (context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加，所有不匹配路由全部进入 404 的路由配置
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
