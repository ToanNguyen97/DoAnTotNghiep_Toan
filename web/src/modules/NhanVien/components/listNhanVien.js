'use strict'

import toast from '../../../plugins/toast.js'
import popupNhanVien from '../core/popupNhanVien.vue'
import moment from 'moment'
export default {
  components: {
    popupNhanVien
  },
  data() {
    return {
      open: false,
      edit: false,
      disabled: true,
      isThem: false,
      NhanVienSelect: {},
      pagination: {},
      selected: [],
      headers: [
        { text: 'Họ Tên Nhân Viên',value: 'tenNhanVien' },
        { text: 'Ảnh Đại Diện', value: 'anhDaiDien' },
        { text: 'Ngày Sinh', value: 'ngaySinh' },
        { text: 'Giới Tính', value: 'gioiTinh' },
        { text: 'Số Chứng Minh', value: 'soCMND' },
        { text: 'Số Điện Thoại', value: 'soDienThoai' },
        { text: 'Địa Chỉ', value: 'diaChi' },
        { text: 'Chức vụ', value: 'ChucVu' },
        { text: 'Thao Tác', value: '' }
      ],
      loading: true,
      snackbar: false,
      snackbarMulti: false,
      idXoa: '',
      tenNhanVien: '',   
    }
  },
  created() {
    this.loading = false
    this.$store.dispatch('nhanvien/getNhanViens').then(res => {
      if(res === false) {
        this.$router.push({path:'/404.html'})
      }
    })
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsNhanVien.length / this.pagination.rowsPerPage)
    },
    dsNhanVien () {
      return this.$store.state.nhanvien.dsNhanVien
    }
  },
  watch: {
    selected () {
      if(this.selected && this.selected.length == 0)
      {
        this.disabled = true
      }
      else
      {
        this.disabled = false
      }
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) 
      {
        this.selected = []
      }
      else
      {
        this.selected = this.dsNhanVien.slice()
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    OpenThem () {
      this.isThem = true
      this.edit = true
    },
    OpenTimKiem () {
      this.open = true
    },
    GotoEdit(item) {
     this.isThem = false
     this.edit = true
     this.NhanVienSelect = item
    },
    ResetPage () {
      this.$store.dispatch('getKhachs')
    },
    OpenSnackback (khachthue) {
      this.tenNhanVien = khachthue.tenNhanVien
      this.idXoa = khachthue._id
      this.snackbar = true
    },
    Delete () {
      if(this.idXoa != '')
      {
        this.$store.dispatch('deleteNhanVien', this.idXoa).then( res => {
          toast.Success('Đã xóa khách thuê: '+ res.hoNhanVien + ' ' + res.tenNhanVien)
          this.snackbar = false
        }).catch( res => {
          toast.Error('Có lỗi xảy ra: ' + res)
        })
      } else {
        toast.Error('Vui lòng chọn phòng cần xóa!')
      }
    },
    DeleteMulti () {
      if (this.selected && this.selected.length != 0)
      {
        let deleteMultiId = this.selected.map(item => item._id)
        this.$store.dispatch('deleteMultiNhanVien', deleteMultiId).then(() => {
          toast.Success('Xóa thành công!')
          this.snackbarMulti = false
          this.disabled = true
        })
      } else {
        toast.Show('Vui lòng chọn phòng để xóa')
      }
    },
    OpenDeleteMulti () {
      this.snackbarMulti = true
    },
    ResetSnackback () {
      this.idXoa = '',
      this.tenNhanVien = '',
      this.snackbar = false
    },
    ResetSnackbackMulti () {
      this.snackbarMulti = false
    }
  },
  filters: {
    formarDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}