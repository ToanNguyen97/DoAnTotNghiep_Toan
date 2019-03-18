import toast from '../../../plugins/toast'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: true,
      formData: {},
      isReal: false
    }
  },
  created() {
    this.$store.dispatch('getKhuPhongs')
    this.$store.dispatch('getLoaiPhongs')
    this.$store.dispatch('getTinhTrangPhongs')
  },
  computed: {
    dsKhuPhong () {
      return this.$store.state.phong.dsKhuPhong
    },
    dsLoaiPhong () {
      return this.$store.state.phong.dsLoaiPhong
    },
    dsTinhTrangPhong () {
      return this.$store.state.phong.dsTinhTrangPhong
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
      this.$store.dispatch('timKiem', payload).then(res => {
        this.Huy()
        toast.Info('Có '+ res.length + ' kết quả  đã được tìm thấy !')
      })
    }
  }

}