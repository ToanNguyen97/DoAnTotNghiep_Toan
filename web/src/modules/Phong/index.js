import ListPhong from './components/listPhong.vue'
import DetailPhong from './components/detailPhong.vue'
export default [
  {
    path: '/danh-sach-phong.html',
    name: 'ListPhong',
    component: ListPhong,
    meta: { roles: ['chủ trọ','nhân viên']},
  },
  {
    path: '/thong-tin-chi-tiet-phong-:id.html',
    name: 'DetailPhong',
    component: DetailPhong,
    meta: { roles: ['chủ trọ','nhân viên']},
  }
]