'use strict'

import ListHopDongThuePhong from './components/listHopDongThuePhong.vue'


export default [
  {
    path: '/danh-sach-hop-dong-thue-phong.html',
    name: 'ListHopDongThuePhong',
    component: ListHopDongThuePhong,
    meta: { roles: ['chủ trọ','nhân viên']},
  }
]