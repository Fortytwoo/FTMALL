/* eslint-disable import/no-duplicates */
import Vue from 'vue'
// eslint-disable-next-line import/no-duplicates
import { Button, Form, FormItem, Input, Message, Header, Aside, Main, Menu } from 'element-ui'

// 弹框提示组件
import { Container } from 'element-ui'
import { Submenu } from 'element-ui'
import { Breadcrumb } from 'element-ui'
import { MenuItem } from 'element-ui'
import { BreadcrumbItem } from 'element-ui'
import { card } from 'element-ui'
import { row } from 'element-ui'
import { col } from 'element-ui'
import { Table } from 'element-ui'
import { TableColumn } from 'element-ui'
import { Switch } from 'element-ui'
import { Tooltip } from 'element-ui'
import { Pagination } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import { dialog } from 'element-ui'
import { MessageBox } from 'element-ui'
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
Vue.use(Breadcrumb)
Vue.use(MenuItem)
Vue.use(BreadcrumbItem)
Vue.use(card)
Vue.use(row)
Vue.use(col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox
