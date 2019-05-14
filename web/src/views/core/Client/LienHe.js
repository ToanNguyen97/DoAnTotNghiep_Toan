import axios from 'axios'
import toast from '../../../plugins/toast.js'
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
      }
  },
  methods: {
    LienHe () {
      this.loadingLienHe = true
      axios.post(`${window.urlApi}api/dat-lien-he`,this.formData).then(res=> {
        console.log(res)
        toast.Success(`Chào ${res.data.hoTenNguoiLienHe}! chúng tôi sẽ liên hệ với bạn khi có phòng`)
        this.loadingLienHe = false
      }).catch(err => {
        toast.Error('Lỗi',err)
      })
    },
    Reset () {
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