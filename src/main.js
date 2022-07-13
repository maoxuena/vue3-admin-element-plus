import { createApp } from 'vue'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 导入全局样式
import '@/styles/index.scss'

// 导入 svgIcon
import installIcons from '@/icons'
// 全局属性 filter
import installFilter from '@/filters'
import installDirective from '@/directives'

// 导入路由鉴权
import './permission'

// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'
// 导入转换图标名称的函数
import { transElIconName } from './utils/index.js'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
// 统一注册el-icon图标
for (const iconName in ElIconModules) {
  app.component(transElIconName(iconName), ElIconModules[iconName])
}

app.use(store).use(router).use(i18n).mount('#app')
