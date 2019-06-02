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
      nameExcel:'',
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
        { text: 'Mã Số Phiếu Thu',value: '_id' },
        { text: 'Tên Phòng', value: 'phongID.tenPhong' },
        { text: 'Ngày Lập', value: 'ngayLap' },
        { text: 'Ngày Kết Thúc', value: 'ngayHetHan' }
      ],
      exportHeader1: {
        'Mã Phiếu Thu': '_id',
        'Phòng Thuê': 'phongID.tenPhong',
        'Khu Phòng': 'phongID.khuPhongID.tenKhuPhong',
        'Ngày Lập': {
          field: 'ngayLap',
          callback: (value) => {
            return  moment(value).format('DD/MM/YYYY')
          }
        },
        'Ngày Hết Hạn': {
          field: 'ngayHetHan',
          callback: (value) => {
            return  moment(value).format('DD/MM/YYYY')
          }
        } 
      },
      dsPT: []
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.dsPT.length  === 0
      ) return 0
      return Math.ceil(this.dsPT.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
   async ThongKePhieuThu () {
      try {
        this.loadingTK = true
        this.dsPT = await ThongKeServices.ThongKePhieuThu(this.formData)
        let date = new Date()
        this.nameExcel = `phieu-thu-tien-${date.getMonth() +1 +'-' +date.getFullYear()}.xls`
        if(this.dsPT.length > 0)
        {
          this.loadingTK = false
          toast.Success(`Có ${this.dsPT.length} ${this.formData.tieuChi === 'ptLap'? 'Phiếu Thu Lập':'Phiếu Thu Hết Hạn'} được tìm thấy!`)
        } else {
          this.loadingTK = false
          toast.Info(`Không có  ${this.formData.tieuChi === 'ptLap'? 'Phiếu Thu Lập':'Phiếu Thu Hết Hạn'} nào được tìm thấy!`)
        }
      } catch (err) {
        toast.Error(err)
      }
    },
    async BaoHetHanPT () {
      try {
        let res = await ThongKeServices.BaoHetHanPT(this.dsPT)
        if(res) {
          toast.Success('Đã gởi mail báo hết hạn hợp đồng!')
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