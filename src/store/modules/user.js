import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    isMicro: window.parent !== window || window.__MICRO_APP_ENVIRONMENT__ || window.__POWERED_BY_WUJIE__, // 是否是微前端
    toPath: '',
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToPath (state, toPath) {
      state.toPath = toPath
    },
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login (context, userInfo) {
      const { username, password, sso = false } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            this.commit('user/setToken', data.token)
            // 跳转
            if (!sso) {
              const currentRoute = router.currentRoute.value
              const redirect = currentRoute.query.redirect || '/'
              router.push(redirect)
            }
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo (context) {
      const res = await getUserInfo()
      const result = res || {}
      this.commit('user/setUserInfo', res || {})
      return result
    },
    logout () {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO:清理权限相关配置
      // router.push('/login')
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    },
    /**
     * 是否需要单点登录
     * 微环境 或者 iframe 则需要，反之，不需要
     */
    async isSsoLogin() {
      // 固定用户名密码模拟单点登录
      await this.dispatch('user/login', {
        username: 'super-admin',
        password: '123456',
        sso: true
      })
    }
  }
}
