import DatePicker from 'vue2-datepicker'
import BookPhongServices from './BookPhongServices.js'
import toast from '../../../plugins/toast.js'
import validate from '../../../plugins/validation.js'
export default {
  components: { 
    DatePicker
  },
  props:{
    phongSelected: {
      type: Object
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
      hoNguoiBookRules : [
        validate.required,
        validate.max20
      ],
      tenNguoiBookRules: [
        validate.required,
        validate.max13
      ],
      emailRules: [
        validate.required,
        validate.email
      ],
      soCMNDRules: [
        validate.required,
        validate.max20
      ],
      soDienThoaiRules: [
        validate.required,
        validate.max13
      ],
      diaChiRules: [
        validate.required,
        validate.max100
      ],
      ngayNhanPhongRules: [
        validate.required,
        v => (console.log('value',v))
      ],
      formData: {},
      loadingBook: false,
      lang: {
        days: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        pickers: ['tới 7 ngày', 'tới 1 tháng', 'lui 7 ngày', 'lui 1 tháng'],
        placeholder: {
          date: 'Chọn ngày nhận phòng'
        }
      }
    }
  },
  methods: {   
    Book () {
      if (this.$refs.form.validate() && this.formData.ngayNhanPhong) {
        this.loadingBook = true
        BookPhongServices.bookPhong(this.formData).then(() => {
          this.loadingBook = false
          toast.Success('Vui lòng check mail để kích hoạt')
        }).catch(err => {
          toast.Error('Lỗi',err)
        })
    }
    },
    Reset () {
      this.$refs.form.reset()
      this.formData = {}
      this.formData.phongID = this.phongSelected._id
      this.formData.ngayBookPhong = new Date()
      this.formData.status = false
    }
  },
  watch: {
    value (v) {
      if(v) {
        this.formData.phongID = this.phongSelected._id
        this.formData.ngayBookPhong = new Date()
        this.formData.status = false
      } else {
        this.Reset()
      }
    }
  },
}