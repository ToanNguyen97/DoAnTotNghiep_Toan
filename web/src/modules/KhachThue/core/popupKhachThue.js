import _ from 'lodash'
import toast from '../../../plugins/toast'
import moment from 'moment'
export default {
  props:{
    khachThueSelect: {
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
      dsTinhTrang: [
        { ten: 'Đang thuê'},
        { ten: 'Chưa thuê'},
        { ten: 'Đã trả phòng'}
      ],
      formData: {
        gioiTinh: true
      },
      anhDaiDien: '',
      image: '',
      hoKhachThueRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 30) || 'Tên tối đa 30 ký tự'
      ],
      tenKhachThueRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 20) || 'Tên tối đa 20 ký tự'
      ],
      uploadingPhoto: false,
      srcAnhDaiDien: null
    }
  },
  created() {
    
  },
  computed: {
    dsLoaiKhachThue () {
      return this.$store.state.khachthue.dsLoaiKhachThue
    },
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
      if(this.formData.loaiKhachThueID._id)
      {
        this.formData.loaiKhachThueID = this.formData.loaiKhachThueID._id
      }
      this.$store.dispatch('save', this.formData).then(() => {
        toast.Success('Thành Công!')
        this.Huy()
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
      if(v) {
        this.$store.dispatch('getLoaiKhachs')
      }
      if (v && this.isThem === false) {
        if (this.khachThueSelect && this.khachThueSelect._id) {
          this.formData = _.cloneDeep(this.khachThueSelect)
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