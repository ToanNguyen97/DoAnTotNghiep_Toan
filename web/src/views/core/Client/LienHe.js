import axios from 'axios'
import toast from '../../../plugins/toast.js'
import validate from '../../../plugins/validation.js'
export default {
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
      formData: {},
      loadingLienHe: false,
      valid: true,
      hoTenNguoiLienHeRules: [
        validate.required,
        validate.max40
      ],
      emailRules: [
        validate.required,
        validate.email
      ],
      soDienThoaiRules: [
        validate.required,
        validate.max13
      ]
      }
  },
  methods: {
    LienHe () {
      if (this.$refs.form.validate()) {
        this.loadingLienHe = true
        axios.post(`${window.urlApi}api/dat-lien-he`,this.formData).then(res=> {
          console.log(res)
          toast.Success(`Chào ${res.data.hoTenNguoiLienHe}! chúng tôi sẽ liên hệ với bạn khi có phòng`)
          this.loadingLienHe = false
        }).catch(err => {
          toast.Error('Lỗi',err)
        })
      }
    },
    Reset () {
      this.$refs.form.reset()
      this.formData = {}
      this.formData.phongID = this.phongSelected._id
    }
  },
  watch: {
    value (v) {
      if(v) {
        this.formData.phongID = this.phongSelected._id
      }
    }
  },
}