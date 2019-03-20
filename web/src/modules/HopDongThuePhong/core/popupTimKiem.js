import toast from '../../../plugins/toast'
import moment from 'moment'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: false,
      dsTinhTrang: [
        { ten: 'Đã Thuê'},
        { ten: 'Chưa Thuê'},
        { ten: 'Đã trả phòng'}
      ],
      valid: true,
      formData: {},
      isReal: false
    }
  },
  created() {
    this.$store.dispatch('getLoaiKhachs')
  },
  computed: {
    dsLoaiKhachThue () {
      return this.$store.state.khachthue.dsLoaiKhachThue
    },
    computedDateFormattedMomentjs () {
      return this.formData.ngaySinh ? moment(this.formData.ngaySinh).format('DD/MM/YYYY') : ''
    }
  },
  methods: {
    Huy () {
      this.$emit('input',false)
      this.$refs.form.reset()
    },
    Reset () {
      this.$refs.form.reset()
    },
    TimKiem () {
      this.$store.dispatch('timKiem', this.formData).then(res => {
        this.Huy()
        toast.Info('Có '+ res.length + ' kết quả  đã được tìm thấy !')
      })
    },
    Search (value) {
      this.isReal = value
      let payload = {isReal: this.isReal, formData: this.formData}
      this.$store.dispatch('timKiemKhachThue', payload).then(res => {
        this.Huy()
        toast.Info('Có '+ res.length + ' kết quả  đã được tìm thấy !')
      })
    }
  }

}