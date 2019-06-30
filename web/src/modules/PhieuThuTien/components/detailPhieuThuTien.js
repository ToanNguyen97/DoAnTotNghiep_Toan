import moment from 'moment'
import toast from '../../../plugins/toast.js'
export default {
  data() {
    return {
      phong: {},
      search: '',
      pagination: {
        rowsPerPage:3,
        sortBy: 'ngayLap',
        'descending': true
      },
      rating:4,
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
      phieuThuTT: {},
      dsCTPT: [],
      tenThang: "",
      disabled: true
    }
  },
  created () {
   this.$store.dispatch('phong/getPhongById',this.$route.params.id).then( res => {
     this.phong = res
     let PhieuThuNow = res.dsPhieuThu[res.dsPhieuThu.length -1]
     if(PhieuThuNow) {
      this.phieuThuTT = PhieuThuNow
      if(this.phieuThuTT.tinhTrangPhieuThu != 'đã đóng') {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.dsCTPT = PhieuThuNow.dsCTPT
      this.tongTien = this.dsCTPT.reduce((tongTien, current) => {
       return (current.chiSoMoi && current.chiSoMoi >0)?tongTien + (current.chiSoMoi - current.chiSoCu) * current.donGia : tongTien + current.donGia
      }, 0)
      this.tenThang = moment(PhieuThuNow.ngayLap).format('MM')
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
    ViewDetail (phieuThu) {
      this.phieuThuTT = phieuThu
      if(this.phieuThuTT.tinhTrangPhieuThu != 'đã đóng') {
        this.disabled = false
      }
      else {
        this.disabled = true
      }
      this.tenThang = moment(phieuThu.ngayLap).format('MM')
      this.dsCTPT = phieuThu.dsCTPT
      this.tongTien = this.dsCTPT.reduce((tongTien, current) => {
       return (current.chiSoMoi && current.chiSoMoi >0)?tongTien + (current.chiSoMoi - current.chiSoCu) * current.donGia : tongTien + current.donGia
      },0)
    },
    ThanhToan () {
      if (this.phieuThuTT) {
        this.phieuThuTT.tinhTrangPhieuThu = 'đã đóng'
        let {_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu} = this.phieuThuTT
        let payload = {_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu}
        this.$store.dispatch('thanhToan', payload).then( res => {
          toast.Success(res._id + ' đã được thanh toán')
          if(res.tinhTrangPhieuThu === 'đã đóng')
          {
            this.disabled = true
          }
        })
      }
    },
    SendMail () {
      if (this.phieuThuTT) {
        this.$store.dispatch('sendMail', this.phieuThuTT._id).then( () => {
          toast.Success('Đã gửi mail')
        })
      }
    }
  },
}