import Vue from 'vue'
import Router from 'vue-router'
import Client from './views/Client.vue'
import Admin from './views/Admin.vue'
import Page404 from './views/core/Admin/page404.vue'
import Login from './views/Login.vue'
//import LoginRoutes from './modules/User/index.js'
import PhongRoutes from './modules/Phong/index.js'
import KhachThueRoutes from './modules/KhachThue/index.js'
import HopDongThuePhongRoutes from './modules/HopDongThuePhong/index.js'
import PhieuThuTienRoutes from './modules/PhieuThuTien/index.js'
import Authenticated from './plugins/auththenticated.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: Authenticated.notAuthenticate
    },
    { 
      path:'/404.html',
      name:'page404',
      component: Page404
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [...PhongRoutes, ...KhachThueRoutes, ...HopDongThuePhongRoutes, ...PhieuThuTienRoutes],
      beforeEnter: Authenticated.Authenticated
    },
    {
      path: '/',
      name: 'Client',
      component: Client
    }
  ]
})
