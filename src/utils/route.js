import path from 'path'

/**
 * 返回所有子集路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter(route => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复路由表剔除
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes(filterRouters) 数据，返回对应 menu 规则数据
 */
export function generateMenus (routes, basePath = '') {
  const result = []
  // 遍历路由表，不满足 meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children 不存在 meta，进入迭代 generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children，存在 meta || 存在 children && 存在 meta
    // 因为最终的 menu 需要进行跳转，所以合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    // 当前路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 result
        result.push(route)
      }
    }
    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
