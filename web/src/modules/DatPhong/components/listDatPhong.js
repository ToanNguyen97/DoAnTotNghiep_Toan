import datPhongServices from '../datPhongServices.js'
import LapHopDong from '../../HopDongThuePhong/core/popupHopDong.vue'
import toast from '../../../plugins/toast.js'
import moment from 'moment'
export default {
  components: {
    LapHopDong
  },
  data() {
    return {
      search: '',
      phongSelect: {},
      soDT: '',
      khachSelect: {},
      openHopDong: false,
      headers: [
        {
          text: 'Họ Tên Khách',
          align: 'left',
          width:200,
          sortable: true,
          value: '_id'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Số Điện Thoại',
          align: 'left',
          sortable: true,
          value: 'soDienThoai'
        },
        {
          text: 'Số Chứng Minh',
          align: 'left',
          sortable: true,
          value: 'soCMND'
        },
        {
          text: 'Tên Phòng',
          align: 'left',
          sortable: true,
          value: 'phongID'
        },
        {
          text: 'Ngày Đặt Phòng',
          align: 'left',
          sortable: true,
          value: 'ngayBookPhong'
        },
        {
          text: 'Ngày Nhận Phòng',
          align: 'left',
          sortable: true,
          value: 'ngayNhanPhong'
        },
        {
          text: 'Tình Trạng',
          align: 'left',
          width: 50,
          sortable: true,
          value: 'status'
        },
        {
          text: 'Thao Tác',
          align: 'left',
          sortable: true,
          value: ''
        }
      ],
      dsKhachDatPhong: [],
      pagination: {},
    }
  },
  async created() {
    this.dsKhachDatPhong = await datPhongServices.listKhachDatPhong()
    this.pagination.totalItems = this.dsKhachDatPhong.length
  },
  computed: {
    pages () {
      if(this.dsKhachDatPhong.length === 0) {
        return 0
      } else {
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  },
  methods: {
    ResetPage () {
      this.search = ''
    },
    async BookPhong (item) {
      let formData = {
        hoKhachThue: item.hoNguoiBook,
        tenKhachThue: item.tenNguoiBook,
        email: item.email,
        soDienThoai: item.soDienThoai,
        soCMND: item.soCMND,
        diaChi: item.diaChi
      }
      await datPhongServices.ThemKhach(formData).then(res => {
        if( res && res._id) {
          this.khachSelect = item
          this.soDT = res.soDienThoai
          
          console.log(this.soDT)
          this.phongSelect = item.phongID
          this.openHopDong = true
        } else {
          toast.Error('Lỗi từ thêm khách')
        }
      })   
    }
  },
  filters: {
    formatDate (ngay) {
      return moment(ngay).format('DD/MM/YYYY')
    }
  }
}