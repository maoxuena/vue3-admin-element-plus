import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  console.log(router.getRoutes())
  console.log('to', to)
  console.log('from', from)
  console.log('permission.js iframe', window.parent !== window)
  console.log('permission.js 微前端 micro-app', window.__MICRO_APP_ENVIRONMENT__)
  console.log('permission.js 微前端 无界', window.__POWERED_BY_WUJIE__)
  // 用户已登录，存在 token
  if (store.getters.token) {
    // 用户已登录，不允许进入 login，跳转到主页
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        console.log('子应用 获取用户信息', permission)
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        return next(redirect)
      }
      next()
    }
  } else {
    // 用户未登录，没有token，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login', replace: true, query: { redirect: to.path } })
    }
  }
})
