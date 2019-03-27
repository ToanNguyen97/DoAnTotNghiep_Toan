import moment from 'moment'

export default {
  data() {
    return {
      phong: {},
      search: '',
      pagination: {
        rowsPerPage:3
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
      dsCTPT: [],
      tenThang: ""
    }
  },
  created () {
   this.$store.dispatch('phong/getPhongById',this.$route.params.id).then( res => {
     this.phong = res
     console.log('phong',res)
     let PhieuThuNow = res.dsPhieuThu[res.dsPhieuThu.length -1]
     this.dsCTPT = PhieuThuNow.dsCTPT
     this.tenThang = moment(PhieuThuNow.ngayLap).format('MM')
   })
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  filters: {
    formatDate (ngay) {
      return moment(ngay).format('DD/MM/YYYY')
    }
  },
  methods: {
    ViewDetail (phieuThu) {
      this.tenThang = moment(phieuThu.ngayLap).format('MM')
      this.dsCTPT = phieuThu.dsCTPT
    }
  },
}