import moment from 'moment'
import toast from '../../../plugins/toast.js'
import LapHopDong from '../../HopDongThuePhong/core/popupHopDong.vue'
export default {
  components: {
    LapHopDong
  },
  data() {
    return {
      openHD: false,
      phong: {},
      dsKhachThue: [],
      dsKhachTraPhong: [],
      search: '',
      search1:'',
      pagination: {
        rowsPerPage:4
      },
      rating: 4,
      active: null,
      tongTien: 0,
      headers: [
        {
          text: 'Họ Tên Khách',
          align: 'left',
          sortable: true,
          value: '_id'
        },
        {
          text: 'Ảnh Đại Diện',
          align: 'left',
          sortable: true,
          value: 'anhDaiDien'
        },
        {
          text: 'Giới Tính',
          align: 'left',
          sortable: true,
          value: 'gioiTinh'
        },
        {
          text: 'Số Điện Thoại',
          align: 'left',
          sortable: true,
          value: 'soDienThoai'
        },
        {
          text: 'Địa Chỉ',
          align: 'left',
          sortable: true,
          value: 'diaChi'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Thao Tác',
          align: 'left',
          sortable: true,
          value: ''
        }
      ],
      headers1: [
        {
          text: 'Họ Tên Khách',
          align: 'left',
          sortable: true,
          value: '_id'
        },
        {
          text: 'Ảnh Đại Diện',
          align: 'left',
          sortable: true,
          value: 'anhDaiDien'
        },
        {
          text: 'Giới Tính',
          align: 'left',
          sortable: true,
          value: 'gioiTinh'
        },
        {
          text: 'Số Điện Thoại',
          align: 'left',
          sortable: true,
          value: 'soDienThoai'
        },
        {
          text: 'Địa Chỉ',
          align: 'left',
          sortable: true,
          value: 'diaChi'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Ngày Trả Phòng',
          align: 'left',
          sortable: true,
          value: 'ngayLap'
        },
        {
          text: 'Thao Tác',
          align: 'left',
          sortable: true,
          value: ''
        }
      ],
      disabled: true,
      urlComment: ''
    }
  },

  created () {
   this.$store.dispatch('phong/getPhongById',this.$route.params.id).then( res => {  
     this.phong = res
     this.urlComment = "http://localhost:8080/thong-tin-chi-tiet-phong-"+ this.$route.params.id +".html"
     if(this.phong && this.phong.dsHopDong && this.phong.dsHopDong.length > 0) {
       // lấy ra những hợp đồng có khách thuê của phòng này và lấy khách thuê đó
       this.dsKhachThue = this.phong.dsHopDong.filter(item => {
         return item.khachThueID.phongs.includes(item.phongID)
       }).map(item => { return item.khachThueID})
       // còn phải check 1 khách ở phòng này chuyển đi r lại chuyển lại sẽ bị trùng id nên lặp lại, cho nên chỉ check1 lần duy nhất
       this.dsKhachThue = Array.from(new Set(this.dsKhachThue.map(s => s._id)))
       .map(
         _id => {
           return {
             _id: _id,
             hoKhachThue: this.dsKhachThue.find(s => s._id === _id).hoKhachThue,
             tenKhachThue: this.dsKhachThue.find(s => s._id === _id).tenKhachThue,
             anhDaiDien: this.dsKhachThue.find(s => s._id === _id).anhDaiDien,
             ngaySinh: this.dsKhachThue.find(s => s._id === _id).ngaySinh,
             gioiTinh: this.dsKhachThue.find(s => s._id === _id).gioiTinh,
             soCMND: this.dsKhachThue.find(s => s._id === _id).soCMND,
             soDienThoai: this.dsKhachThue.find(s => s._id === _id).soDienThoai,
             hoTenNguoiThan: this.dsKhachThue.find(s => s._id === _id).hoTenNguoiThan,
             diaChi: this.dsKhachThue.find(s => s._id === _id).diaChi,
             loaiKhachThueID: this.dsKhachThue.find(s => s._id === _id).loaiKhachThueID,
             tinhTrangKhachThue: this.dsKhachThue.find(s => s._id === _id).tinhTrangKhachThue,
             phongs: this.dsKhachThue.find(s => s._id === _id).phongs,
             email: this.dsKhachThue.find(s => s._id === _id).email,
           }
         }
       )  
      }
    })
    this.$store.dispatch('phieutraphong/getByPhongId', this.$route.params.id)
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsPhieuTraPhong.length / this.pagination.rowsPerPage)
    },
    dsPhieuTraPhong () {
      return this.$store.state.phieutraphong.dsPhieuTraPhong
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
    TraPhong (item) {
      let payload = {
        phongID: this.phong._id,
        khachThueID: item._id,
        ngayLap: Date.now()
      }
      this.$store.dispatch('phieutraphong/save', payload).then(res => {
        this.dsKhachThue = this.dsKhachThue.filter(key => {
          return String(key._id) != String(res.khachThueID._id)
        })
        toast.Success('Đã trả phòng')
      })
    }
  },
}