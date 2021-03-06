import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from './../components/Login'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ './../components/Login')
// import Home from './../components/Home'
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ './../components/Home')
// import Welcome from './../components/Welcome'
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ './../components/Welcome')
// Users
// import Users from './../components/Users/Users'
const Users = () => import(/* webpackChunkName:"Users" */ './../components/Users/Users')
// Rights内的组件
// import Roles from '../components/Rights/Roles'
const Roles = () => import(/* webpackChunkName:"Roles_Rights" */ './../components/Rights/Roles')
// import Rights from './../components/Rights/Rights'
const Rights = () => import(/* webpackChunkName:"Roles_Rights" */ './../components/Rights/Rights')
// Goods内的组件
// import Goods from './../components/Goods/Goods'
const Goods = () => import(/* webpackChunkName:"Goods_Categories_addGoods_Params" */ './../components/Goods/Goods')
// import Params from '../components/Goods/Params'
const Params = () => import(/* webpackChunkName:"Goods_Categories_addGoods_Params" */ './../components/Goods/Params')
// import Categories from '../components/Goods/Categories'
const Categories = () => import(/* webpackChunkName:"Goods_Categories_addGoods_Params" */ './../components/Goods/Categories')
// Reports内的组件
// import Orders from './../components/Orders/Orders'
const Orders = () => import(/* webpackChunkName:"Orders" */ './../components/Orders/Orders')
// import Reports from './../components/Reports/Reports'
const Reports = () => import(/* webpackChunkName:"Reports" */ './../components/Reports/Reports')
// import addGoods from '../components/Goods/addGoods'
const addGoods = () => import(/* webpackChunkName:"Goods_Categories_addGoods_Params" */ './../components/Goods/addGoods')
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      {
        path: '/Welcome', component: Welcome
      },
      // Users内的组件 Users
      {
        path: '/users', component: Users
      },
      // Rights内的组件 Roles   Rights
      {
        path: '/roles', component: Roles
      },
      {
        path: '/Rights', component: Rights
      },
      // Goods内的组件 Goods    Params    Categories
      {
        path: '/goods', component: Goods
      },
      {
        path: '/addGoods', component: addGoods
      },
      {
        path: '/Params', component: Params
      },
      {
        path: '/Categories', component: Categories
      },
      // Orders内的组件   Orders
      {
        path: '/orders', component: Orders
      },
      // Reports内的组件  Reports
      {
        path: '/reports', component: Reports
      }
    ]
  }

]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 表示放行
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && !window.sessionStorage.getItem('token')) return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
  if (tokenStr && to.path === '/login') return next('/home')
  // to and from are both route objects. must call `next`.
})
export default router
