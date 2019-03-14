import popupPhong from '../core/popupPhong.vue'
export default {
  components: {
    popupPhong
  },
  data() {
    return {
      edit: false,
      phongSelect: {},
      pagination: {},
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
        { text: 'Khu Phòng', value: 'khuPhongID' },
        { text: 'Loại Phòng', value: 'loaiPhongID' },
        { text: 'Thao Tác', value: '' }
      ],
      loading: true,     
    }
  },
  created() {
    this.$store.dispatch('getPhongs')
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsPhong.length / this.pagination.rowsPerPage)
    },
    dsPhong () {
      this.loading = false   
      return this.$store.state.phong.dsPhong
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
    GotoEdit(item) {
     this.edit = true
     this.phongSelect = item
    }
  },
  filters: {
    formatCurrency (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}