import Vue from 'vue'
import Router from 'vue-router'
import Client from './views/Client.vue'
import Admin from './views/Admin.vue'
import Page404 from './views/core/Admin/page404.vue'
import PageSuccess from './views/core/Admin/Success.vue'
import Login from './views/Login.vue'
//import LoginRoutes from './modules/User/index.js'
import PhongRoutes from './modules/Phong/index.js'
import KhachThueRoutes from './modules/KhachThue/index.js'
import HopDongThuePhongRoutes from './modules/HopDongThuePhong/index.js'
import PhieuThuTienRoutes from './modules/PhieuThuTien/index.js'
import ThongKeRoutes from './modules/ThongKe/index.js'
import Dashboard from './modules/Dashboard/index.js'
import NhanVienRoutes from './modules/NhanVien/index.js'
import LayoutKhachThue from './modules/LayoutKhach/index.js'
import Authenticated from './plugins/auththenticated.js'
import TrangChu from './views/core/Client/TrangChu.vue'
import danhSachPhong from './views/core/Client/DanhSachPhong.vue'
import bookPhong from './views/core/Client/BookPhong.vue'
import ActiveBooking from './views/core/Client/ActiveBooking.vue'
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
      path:'/success',
      name:'success',
      component: PageSuccess
    },
    {
      path: '/kich-hoat-don-dat-phong-:id.html',
      name: 'ActiveBooking',
      component: ActiveBooking
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: { role: '5cc5752e6adfd01278d9a325'},
      component: Admin,
      children: [...Dashboard, ...PhongRoutes, ...KhachThueRoutes, ...HopDongThuePhongRoutes, ...PhieuThuTienRoutes, ...NhanVienRoutes, ...LayoutKhachThue, ...ThongKeRoutes],
      beforeEnter: Authenticated.Authenticated
    },
    {
      path: '/',
      name: 'Client',
      component: Client,
      children: [
        {
          path:'/index.html',
          name: 'TrangChu',
          component: TrangChu
        },
        {
          path:'/danh-sach-phong-tro.html',
          name: 'danhSachPhong',
          component: danhSachPhong
        },
        {
          path: '/chi-tiet-phong-:id.html',
          name: 'chitietphong',
          component: bookPhong
        }
      ]
    }
  ]
})
