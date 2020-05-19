import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// import store from './store'
import './assets/css/global.css'
import './plugins/element.js'
// 样式表

// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.prototype.$http = axios
// // 这是配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
