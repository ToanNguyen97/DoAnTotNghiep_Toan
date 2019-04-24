import infoKhachThue from './components/infoKhachThue.vue'
import infoPhongOfKhach from './components/infoPhongOfKhach.vue'
export default [
  {
    path: '/thong-tin-khach-thue.html',
    name: 'infoKhachThue',
    component: infoKhachThue,
    meta: { roles: ['khách thuê'] }
  },
  {
    path: '/thong-tin-phong-dang-thue.html',
    name: 'infoPhongOfKhach',
    component: infoPhongOfKhach,
    meta: { roles: ['khách thuê'] }
  }
]