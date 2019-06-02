import ThongKeHopDong from './components/thongKeHopDong.vue'
import ThongKePhieuThu from './components/thongKePhieuThu.vue'

export default [
  {
    path:'/thong-ke-hop-dong.html',
    name:'thongKeHopDong',
    component: ThongKeHopDong,
    meta: { role: '5cc5621b130408431020fce2'},
  },
  {
    path:'/thong-ke-phieu-thu.html',
    name:'thongPhieuThu',
    component: ThongKePhieuThu,
    meta: { role: '5cf32d494c6796211463d95e'},
  }
]