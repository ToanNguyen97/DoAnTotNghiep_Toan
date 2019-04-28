import listPhieuThuTien from './components/listPhieuThuTien.vue'
import detailPhieuThuTien from './components/detailPhieuThuTien.vue'
export default [
  {
    path: '/phieu-thu-tien-phong.html',
    name: 'PhieuThuTien',
    component: listPhieuThuTien,
    meta: { role:'5cc560f421fd1c0d185cbd83'},
  },
  {
    path: '/chi-tiet-phieu-thu-tien/p.:id.html',
    name: 'DetailPhieuThuTien',
    component: detailPhieuThuTien,
    meta: { role:'5cc560f421fd1c0d185cbd83'},
  }
]