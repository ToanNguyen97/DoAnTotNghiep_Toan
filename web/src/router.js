import Vue from 'vue'
import Router from 'vue-router'
import Client from './views/Client.vue'
import Admin from './views/Admin.vue'
import Login from './views/Login.vue'
import PhongRoutes from './modules/Phong/index.js'
import KhachThueRoutes from './modules/KhachThue/index.js'
import HopDongThuePhongRoutes from './modules/HopDongThuePhong/index.js'
import PhieuThuTienRoutes from './modules/PhieuThuTien/index.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [...PhongRoutes, ...KhachThueRoutes, ...HopDongThuePhongRoutes, ...PhieuThuTienRoutes]
    },
    {
      path: '/',
      name: 'Client',
      component: Client
    }
  ]
})
