'use strict'

import toast from '../../../plugins/toast.js'
import popupHopDongThue from '../core/popupHopDong.vue'
import popupTimKiem from '../core/popupTimKiem.vue'
import moment from 'moment'
export default {
  components: {
    popupHopDongThue,
    popupTimKiem
  },
  data() {
    return {
      open: false,
      edit: false,
      isThem: false,
      disabled: true,
      HopDongThuePhongSelect: {},
      pagination: {},
      selected: [],
      headers: [
        { text: 'Mã Số Hợp Đồng',value: '_id' },
        { text: 'Họ Tên Khách Thuê', value: 'khachThueID' },
        { text: 'Tên Phòng', value: 'phongID' },
        { text: 'Ngày Lập', value: 'ngayLap' },
        { text: 'Ngày Kết Thúc', value: 'ngayKetThuc' },
        { text: 'Thao Tác', value: '' }
      ],
      loading: true,
      snackbar: false,
      snackbarMulti: false,
      idXoa: '',
      soHopDong: '',   
    }
  },
  created() {
    this.loading = false
    this.$store.dispatch('getListHopDongThuePhong')
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsHopDongThuePhong.length / this.pagination.rowsPerPage)
    },
    dsHopDongThuePhong () {
      return this.$store.state.hopdongthuephong.dsHopDongThuePhong
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
        this.selected = this.dsHopDongThuePhong.slice()
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
     this.edit = true
     this.HopDongThuePhongSelect = item
    },
    ResetPage () {
      this.$store.dispatch('getListHopDongThuePhong')
    },
    OpenSnackback (hopdongthuephong) {
      this.soHopDong = hopdongthuephong._id
      this.idXoa = hopdongthuephong._id
      this.snackbar = true
    },
    Delete () {
      if(this.idXoa != '')
      {
        this.$store.dispatch('deleteKhachThue', this.idXoa).then( res => {
          toast.Success('Đã xóa khách thuê: '+ res._id)
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
      this.soHopDong = '',
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