import popupPhong from '../core/popupPhong.vue'
import popupTimKiem from '../core/popupTimKiem.vue'
import toast from '../../../plugins/toast.js'
export default {
  components: {
    popupPhong,
    popupTimKiem
  },
  data() {
    return {
      open: false,
      edit: false,
      disabled: true,
      isThem: false,
      phongSelect: {},
      pagination: {rowsPerPage:8},
      selected: [],
      headers: [
        {
          text: 'Tên Phòng',
          value: 'tenPhong'
        },
        { text: 'Ảnh Chính', value: 'anhChinh' },
        { text: 'Số Điện (kwh)', value: 'soDien' },
        { text: 'Số Nước (khối)', value: 'soNuoc' },
        { text: 'Giá Phòng (VNĐ)', value: 'giaPhong' },
        { text: 'Khu Phòng', value: 'anhChinh'   },
        { text: 'Loại Phòng', value: 'loaiPhongID' },
        { text: 'Tình Trạng', value: 'tinhTrangPhongID' },
        { text: 'Thao Tác', value: '', sortable: false}
      ],
      loading: true,
      snackbar: false,
      snackbarMulti: false,
      idXoa: '',
      tenPhong: '',   
    }
  },
  mounted() {
    this.loading = false
  },
  async created () {
    this.loading = true
   await this.$store.dispatch('phong/getPhongs').then( res => {
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
      return Math.ceil(this.dsPhong.length / this.pagination.rowsPerPage)
    },
    dsPhong () {
      return this.$store.state.phong.dsPhong
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
        this.selected = this.dsPhong.slice()
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
     this.phongSelect = item
    },
    GotoDetail (id) {
      this.$router.push({path:`/thong-tin-chi-tiet-phong-${id}.html`})
    },
    ResetPage () {
      this.$store.dispatch('phong/getPhongs')
    },
    OpenSnackback (phong) {
      this.tenPhong = phong.tenPhong
      this.idXoa = phong._id
      this.snackbar = true
    },
    Delete () {
      if(this.idXoa != '')
      {
        this.$store.dispatch('phong/deletePhong', this.idXoa).then( res => {
          toast.Success('Đã xóa thành công '+ res.tenPhong)
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
        this.$store.dispatch('phong/deleteMultiPhong', deleteMultiId).then(() => {
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
      this.tenPhong = '',
      this.snackbar = false
    },
    ResetSnackbackMulti () {
      this.snackbarMulti = false
    }
  },
  filters: {
    formatCurrency (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
