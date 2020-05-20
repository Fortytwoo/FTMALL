import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// import store from './store'
import './assets/css/global.css'
import './plugins/element.js'
// eslint-disable-next-line no-unused-vars
import Login from './components/Login'
// 样式表

// 导入字体图标
import './assets/fonts/iconfont.css'
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
