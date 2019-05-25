import _ from 'lodash'
import toast from '../../../plugins/toast'
import validate from '../../../plugins/validation.js'
// import translateCharacter from '../../../plugins/translateCharacter.js'
// import moment from 'moment'
export default {
  props:{
    phieuThuTienSelect: {
      type: Object
    },
    value: {
      type: Boolean,
      default: false
    },
    isThem: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {},
      valid: true,
      soDienMoiRules: [
        validate.required,
        v => (v && v > this.formData.soDien) || 'Giá trị điện phải lớn hơn số cũ'
      ],
      soNuocMoiRules: [
        validate.required,
        v => (v && v > this.formData.soDien) || 'Giá trị nước phải lớn hơn số cũ'
      ],
    }
  },
  computed: {
  },
  methods: {
    Huy () { 
      this.$emit('input', false)
    },
    XacNhan () {
      if (this.$refs.form.validate()) {
        this.formData.ngayLap = Date.now()
        this.formData.ngayHetHan = Date.now()
        this.$store.dispatch('addPhieuThuTien', this.formData).then( res => {
          this.$store.dispatch('phong/getKhuPhongs')
          this.Huy()
          toast.Success('Phiếu thu: '+res._id + ' đã được lập')
        }).catch( res => {
          toast.Error('Lỗi: '+ res)
        })
      }
    },
  },
  watch: {   
    value (v) {
      if (v && this.isThem === false) {
        if (this.phieuThuTienSelect && this.phieuThuTienSelect._id) {
          this.formData = _.cloneDeep(this.phieuThuTienSelect)
        }
      }
      else if(v)
      {
        let {phongID, soDien, soNuoc} = _.cloneDeep(this.phieuThuTienSelect)
        this.formData = {phongID, soDien, soNuoc}
      }
    }
  },
}