import moment from 'moment'
//import toast from '../../../plugins/toast.js'
export default {
  data() {
    return {
      phong: {},
      dsKhachThue: [],
      search: '',
      pagination: {
        rowsPerPage:3
      },
      tongTien: 0,
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
      disabled: true
    }
  },
  created () {
   this.$store.dispatch('phong/getPhongById',this.$route.params.id).then( res => {
     this.phong = res
     if(this.phong && this.phong.dsHopDong && this.phong.dsHopDong.length > 0) {
       this.dsKhachThue = this.phong.dsHopDong.filter(item => {
        return item.khachThueID.tinhTrangKhachThue === 'Đang thuê'     
       }).map(item => { return item.khachThueID})
     }
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
    },
    formatCurrentcy (tien) {
      return tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
  },
  methods: {  
  },
}