import _ from 'lodash'
import toast from '../../../plugins/toast'
import moment from 'moment'
export default {
  props:{
    NhanVienSelect: {
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
      menu: false,
      valid: true,
      changeAnh: false,
      dsAuth: [
        { ten: 'khách thuê'},
        { ten: 'nhân viên'},
        { ten: 'chủ trọ'}
      ],
      formData: {
        gioiTinh: true
      },
      anhDaiDien: '',
      image: '',
      hoNhanVienRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 30) || 'Tên tối đa 30 ký tự'
      ],
      tenNhanVienRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 20) || 'Tên tối đa 20 ký tự'
      ],
      uploadingPhoto: false,
      srcAnhDaiDien: null
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.formData.ngaySinh ? moment(this.formData.ngaySinh).format('DD/MM/YYYY') : ''
    },
  },
  methods: {
    Huy () {    
      this.$refs.form.reset()
      this.anhDaiDien = null
      this.image = null
      this.changeAnh = false
      this.$emit('input', false)
      this.formData = {gioiTinh: true}
    },
    choosedFile () {
      const files = this.$refs['file'].files
      if(files[0].name.lastIndexOf('.') <=0) {
        return alert('Please add avalid file')
      }
      let fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
          this.anhDaiDien = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0].name
    },
    chooseFIle () {
      if(this.formData.anhDaiDien)
      {
        this.changeAnh = true
      }
      this.$refs['file'].click()
    },
    XacNhan () {
      if(this.image != "")
      {
        let anhDaiDien = {name: this.image, file64: this.anhDaiDien}
        this.formData.anhDaiDien = anhDaiDien
      }
      else
      {
        this.formData.anhDaiDien = {name: "", file64: ""}
      }
      this.$store.dispatch('nhanvien/save', this.formData).then(res => {
        if(res === false) {
          this.$router.push({path:'/404.html'})
        }
        else {
          toast.Success('Thành Công!')
          this.Huy()
        } 
      }).catch( () => {
        toast.Error('Lỗi!')  
      })
    },
    getSrcAnhDaiDien () {
      if(this.value && !this.isThem)
      {
        if (this.changeAnh) {
          this.srcAnhDaiDien = this.anhDaiDien
        } else {
          this.srcAnhDaiDien = `//localhost:3003/image/${this.formData.anhDaiDien}`
        }
      }
    }
  },
  watch: {
    value (v) {
      if (v && this.isThem === false) {
        if (this.NhanVienSelect && this.NhanVienSelect._id) {
          this.formData = _.cloneDeep(this.NhanVienSelect)
          if (this.formData && this.formData.ngaySinh){
            this.formData.ngaySinh = new Date(this.formData.ngaySinh).toISOString().substr(0, 10)
          }
        }
      }
      else
      {
        this.formData = {}
      }
    },
    'formData':'getSrcAnhDaiDien',
    'anhDaiDien': 'getSrcAnhDaiDien'
  },
}