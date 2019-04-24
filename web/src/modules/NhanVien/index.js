import listNhanVien from './components/listNhanVien.vue'

export default [
  {
    path:'/danh-sach-nhan-vien.html',
    name:'listNhanVien',
    component: listNhanVien,
    meta: { roles: ['chủ trọ']},
  }
]