import moment from 'moment'
export default {
  data () {
    return {
      tab: null,
      rating: 4,
      search: '',
      loading: false,
      pagination: {
        rowsPerPage:5
      },
      headers: [
        {
          text: 'Mã Phiếu',
          align: 'left',
          sortable: true,
          value: '_id'
        },
        {
          text: 'Ngày Lập',
          align: 'left',
          sortable: true,
          value: 'ngayLap'
        },
        {
          text: 'Ngày Hết Hạn',
          align: 'left',
          sortable: true,
          value: 'ngayHetHan'
        },
        {
          text: 'Tình Trạng',
          align: 'left',
          sortable: true,
          value: 'tinhTrangPhieuThu'
        },
        {
          text: 'Thao Tác',
          align: 'left',
          sortable: true,
          value: ''
        }
      ],
    }
  },
  created() {
    if(this.userInfo && this.userInfo._id) {
      this.$store.dispatch('layoutkhach/getDetailKhach', this.userInfo._id)
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.auth.user.userInfo
    },
    dsPhong () {
      return this.$store.state.layoutkhach.dsPhong
    }
  },
  watch: {
    userInfo () {
      if(this.userInfo && this.userInfo._id) {
        this.$store.dispatch('layoutkhach/getDetailKhach', this.userInfo._id)
      }
    }
  },
  filters: {
    formatDate (ngay) {
      return moment(ngay).format('DD/MM/YYYY')
    },
    formatCurrentcy (tien) {
      return tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
  },
  methods: {
    ThanhToan (item) {
      this.loading = true
      this.$store.dispatch('layoutkhach/thanhtoan',item).then(res => {
        console.log('work',res)
        window.open(res, '_blank')
        this.loading = false
      })
    }
  },
}