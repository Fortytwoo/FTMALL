/* eslint-disable import/no-duplicates */
import Vue from 'vue'
// eslint-disable-next-line import/no-duplicates
import { Button, Form, FormItem, Input, Message, Header, Aside, Main, Menu } from 'element-ui'

// 弹框提示组件
import { Container } from 'element-ui'
import { Submenu } from 'element-ui'
// import { MenuItemGroup } from 'element-ui'
import { MenuItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
// Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.prototype.$message = Message
