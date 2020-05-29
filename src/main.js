import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// import store from './store'
import './assets/css/global.css'
import './plugins/element.js'
// eslint-disable-next-line no-unused-vars
import Login from './components/Login'
// 样式表

// 导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 引入时间过滤器
import * as custom from '../src/plugins/conversionTime'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证的 Authorization 字段
  // console.log(window)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回config
  return config
})
// 这是配置请求的根路径
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)
// 全局注册过滤器
Object.keys(custom).forEach(key => { Vue.filter(key, custom[key]) })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
