import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import store from '@/store'

const locale = {
  en: en,
  zh: zhCn
}
export default (app) => {
  app.use(ElementPlus, {
    locale: locale[store.getters.language]
  })
}
