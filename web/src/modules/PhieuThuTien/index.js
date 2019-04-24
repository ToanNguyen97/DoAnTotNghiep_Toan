import listPhieuThuTien from './components/listPhieuThuTien.vue'
import detailPhieuThuTien from './components/detailPhieuThuTien.vue'
export default [
  {
    path: '/phieu-thu-tien-phong.html',
    name: 'PhieuThuTien',
    component: listPhieuThuTien,
    meta: { roles: ['chủ trọ','nhân viên']},
  },
  {
    path: '/chi-tiet-phieu-thu-tien/p.:id.html',
    name: 'DetailPhieuThuTien',
    component: detailPhieuThuTien,
    meta: { roles: ['chủ trọ','nhân viên']},
  }
]