import ListPhong from './components/listPhong.vue'
import DetailPhong from './components/detailPhong.vue'
import SearchRoom from './components/searchRoom.vue'
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
  },
  {
    path: '/tra-cuu-phong.html',
    name: 'SearchRoom',
    component: SearchRoom,
    meta: { roles: ['chủ trọ','nhân viên']},
  }
]