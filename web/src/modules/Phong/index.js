import ListPhong from './components/listPhong.vue'
import DetailPhong from './components/detailPhong.vue'
import SearchRoom from './components/searchRoom.vue'
export default [
  {
    path: '/danh-sach-phong.html',
    name: 'ListPhong',
    component: ListPhong,
    meta: { role:'5cc57a84f34b6716fc4a82cb'},
  },
  {
    path: '/thong-tin-chi-tiet-phong-:id.html',
    name: 'DetailPhong',
    component: DetailPhong,
    meta: { role:'5cc57a84f34b6716fc4a82cb'},
  },
  {
    path: '/tra-cuu-phong.html',
    name: 'SearchRoom',
    component: SearchRoom,
    meta: { role:'5cc57a84f34b6716fc4a82cb'},
  }
]