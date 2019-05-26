'use strict'

import toast from '../../../plugins/toast.js'
import popupKhachThue from '../core/popupKhachThue.vue'
import popupTimKiem from '../core/popupTimKiem.vue'
import moment from 'moment'
export default {
  components: {
    popupKhachThue,
    popupTimKiem
  },
  data() {
    return {
      open: false,
      edit: false,
      disabled: true,
      isThem: false,
      khachThueSelect: {},
      pagination: {},
      selected: [],
      headers: [
        { text: 'Họ Tên Khách',value: 'tenKhachThue' },
        { text: 'Ảnh Đại Diện', value: 'anhDaiDien' },
        { text: 'Ngày Sinh', value: 'ngaySinh' },
        { text: 'Giới Tính', value: 'gioiTinh' },
        { text: 'Số Chứng Minh', value: 'soCMND' },
        { text: 'Số Điện Thoại', value: 'soDienThoai' },
        { text: 'Địa Chỉ', value: 'diaChi', width: 247 },
        { text: 'Tình Trạng Khách', value: 'tinhTrangKhachThue' },
        { text: 'Thao Tác', value: '' }
      ],
      loading: true,
      snackbar: false,
      snackbarMulti: false,
      idXoa: '',
      tenKhachThue: '',   
    }
  },
  created() {
    this.loading = false
    this.$store.dispatch('getKhachs')
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsKhachThue.length / this.pagination.rowsPerPage)
    },
    dsKhachThue () {
      return this.$store.state.khachthue.dsKhachThue
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
        this.selected = this.dsKhachThue.slice()
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
     this.khachThueSelect = item
    },
    ResetPage () {
      this.$store.dispatch('getKhachs')
    },
    OpenSnackback (khachthue) {
      this.tenKhachThue = khachthue.tenKhachThue
      this.idXoa = khachthue._id
      this.snackbar = true
    },
    Delete () {
      if(this.idXoa != '')
      {
        this.$store.dispatch('deleteKhachThue', this.idXoa).then( res => {
          toast.Success('Đã xóa khách thuê: '+ res.hoKhachThue + ' ' + res.tenKhachThue)
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
        this.$store.dispatch('deleteMultiKhachThue', deleteMultiId).then(() => {
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
      this.tenKhachThue = '',
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