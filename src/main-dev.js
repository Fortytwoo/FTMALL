import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入阿里图标库
import './assets/css/global.css'
import './plugins/element.js'
// 样式表

// 导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入NProgress js和css文件
import 'nprogress/nprogress.css' // 导入NProgress组件样式表
import NProgress from 'nprogress'
import clipboard from 'clipboard'
// 引入剪贴板插件
// 引入时间过滤器
import * as custom from './plugins/conversionTime'
import axios from 'axios'

axios.defaults.baseURL = 'http://49.233.20.174:3456/api/private/v1/'
// 发起请求时，触发request拦截器

axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证的 Authorization 字段
  // console.log(window)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 开始请求，开启进度条
  // 必须返回config
  NProgress.start()
  return config
})
// 请求成功，返回config前关闭进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// 这是配置请求的根路径
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)
// 全局注册过滤器
Vue.prototype.clipboard = clipboard
// 注册剪贴板插件
Object.keys(custom).forEach(key => { Vue.filter(key, custom[key]) })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
