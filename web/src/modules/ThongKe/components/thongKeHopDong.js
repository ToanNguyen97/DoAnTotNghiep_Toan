import DatePicker from 'vue2-datepicker'
import ThongKeServices from '../services.js'
import toast from '../../../plugins/toast'
import moment from 'moment'
import downloadExcel from 'vue-json-excel'
export default {
  components: { DatePicker, downloadExcel },
  data() {
    return {
      formData: {},
      search: '',
      pagination: {
        rowsPerPage:5
      },
      loadingTK:false,
      lang: {
        days: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        pickers: ['tới 7 ngày', 'tới 1 tháng', 'lui 7 ngày', 'lui 1 tháng'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Chọn ngày thống kê'
        }
      },
      headers: [
        { text: 'Mã Số Hợp Đồng',value: '_id' },
        { text: 'Họ Tên Khách Thuê', value: 'khacThueID.tenKhachThue' },
        { text: 'Tên Phòng', value: 'phongID.tenPhong' },
        { text: 'Ngày Lập', value: 'ngayLap' },
        { text: 'Ngày Kết Thúc', value: 'ngayKetThuc' }
      ],
      exportHeader: {
        'Mã Hợp Đồng': '_id',
        'Họ Khách Thuê': 'khachThueID.hoKhachThue',
        'Tên Khách Thuê': 'khachThueID.tenKhachThue',
        'Phòng Thuê': 'phongID.tenPhong',
        'Khu Phòng': 'phongID.khuPhongID.tenKhuPhong',
        'Ngày Kết Thúc Hợp Đồng': {
          field: 'ngayKetThuc',
          callback: (value) => {
            return  moment(value).format('DD/MM/YYYY')
          }
        } 
      },
      dsHD: []
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.dsHD.length  === 0
      ) return 0
      return Math.ceil(this.dsHD.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
   async ThongKePhong () {
      try {
        this.loadingTK = true
        this.dsHD = await ThongKeServices.ThongKe(this.formData)
        if(this.dsHD.length > 0)
        {
          this.loadingTK = false
          toast.Success(`Có ${this.dsHD.length} ${this.formData.tieuChi === 'hdLap'? 'Hợp Đồng Lập':'Hợp Đồng Hết Hạn'} được tìm thấy!`)
        } else {
          this.loadingTK = false
          toast.Info(`Không có  ${this.formData.tieuChi === 'hdLap'? 'Hợp Đồng Lập':'Hợp Đồng Hết Hạn'} nào được tìm thấy!`)
        }
        
      } catch (err) {
        toast.Error(err)
      }
    }
  },
  filters: {
    formarDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}