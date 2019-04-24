'use strict'

import ListKhachThue from './components/listKhachThue.vue'

export default [
  {
    name: 'ListKhachThue',
    path: '/danh-sach-khach-thue.html',
    component: ListKhachThue,
    meta: { roles: ['chủ trọ','nhân viên']},
  }
]