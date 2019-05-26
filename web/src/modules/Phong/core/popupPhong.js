import _ from 'lodash'
import toast from '../../../plugins/toast'
import khuPhong from './popupKhuPhong.vue'
import loaiPhong from './popupLoaiPhong.vue'
import validate from '../../../plugins/validation.js'
export default {
 
  components: {
    khuPhong,
    loaiPhong
  },
  props:{
    phongSelect: {
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
      email: '',
      openKhuPhong: false,
      openLoaiPhong: false,
      valid: true,
      changeAnh: false,
      changeAnhMulti: false,
      formData: {
        soDien: 0,
        soNuoc: 0,
        giaPhong: 0,
        dKMang: false,
        homeFlag: false,
        hotFlag: false,
        status: false
      },

      anhChinh: '',
      anhChiTiet: [],
      anhChiTietName:[],
      image: '',
      tenPhongRules: [
        validate.required,
        validate.max20
      ],
      khuPhongRules: [
        validate.required,
      ],
      tinhTrangPhongRules: [
        validate.required,
      ],
      loaiPhongRules: [
        validate.required,
      ],
      moTaRules: [
        validate.required,
      ],
      anhChinhRules: [
        validate.required,
      ],
      uploadingPhoto: false,
      srcAnhChinh: null,
      srcAnhChiTiet: null
    }
  },
  created() {
    
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
      this.$refs.form.reset()
      this.anhChinh = null
      this.anhChiTiet = []
      this.image = null
      this.anhChiTietName = []
      this.changeAnh = false
      this.changeAnhMulti = false
      this.$emit('input', false)
      this.formData = {
        soDien: 0,
        soNuoc: 0,
        giaPhong: 0,
        dKMang: false,
        homeFlag: false,
        hotFlag: false,
        status: false
      }
    },
    choosedFile () {
      const files = this.$refs['file'].files
      if(files[0].name.lastIndexOf('.') <=0) {
        return alert('Please add avalid file')
      }
      let fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
          this.anhChinh = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0].name
    },
    chooseFIle () {
      if(this.formData.anhChinh)
      {
        this.changeAnh = true
      }
      this.$refs['file'].click()
    },
    chooseFIleMulti () {
      if(this.formData.anhChiTiet)
      {
        this.changeAnhMulti = true
      }
      this.$refs['multifile'].click()
      console.log('chon multi file ne')
    },
    choosedFileMulti () {
       const files = this.$refs['multifile'].files
       if(!files && !files.length)
       {
         alert('Please choose file')
       }
       for(let i=0; i< files.length;i++){
          this.anhChiTietName.push(files[i].name)
       }
       for(let i=0; i < files.length; i++)
       {
          let fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
          this.anhChiTiet.push(fileReader.result)
          })
          fileReader.readAsDataURL(files[i])
       }
    },
    XacNhan () {
      if (this.$refs.form.validate()) {
          if(this.image != "")
        {
          let anhChinh = {name: this.image, file64: this.anhChinh}
          this.formData.anhChinh = anhChinh
        }
        else
        {
          this.formData.anhChinh = {name: "", file64: ""}
        }
        if(this.anhChiTietName != "")
        {
          let anhChiTiet = {name: this.anhChiTietName, file64: this.anhChiTiet}      
          this.formData.anhChiTiet = anhChiTiet
        }
        else
        {
          this.formData.anhChiTiet = {name: [], file64: []}
        }
        if(this.formData.khuPhongID._id)
        {
          this.formData.khuPhongID = this.formData.khuPhongID._id
        }
        if(this.formData.loaiPhongID._id)
        {
          this.formData.loaiPhongID = this.formData.loaiPhongID._id
        }
        this.$store.dispatch('phong/XacNhan', this.formData).then(() => {
          toast.Success('Thành Công!')
          this.Huy()
        }).catch( () => {
          toast.Error('Lỗi!')  
        })
      }
     
    },
    getSrcAnhChinh () {
      if(this.value && !this.isThem)
      {
        if (this.changeAnh) {
          this.srcAnhChinh = this.anhChinh
        } else {
          this.srcAnhChinh = `//localhost:3003/image/${this.formData.anhChinh}`
        }
      }
    },
    getPhongInput (v) {
      let getGia =  this.dsLoaiPhong.filter(item => {
        return item._id === v
      })
      if(getGia && getGia.length > 0) {
        this.formData.giaPhong = getGia[0].giaPhong
      }
    },
    getSrcAnhChiTiet () {
      if(this.value && !this.isThem)
      {
        if (this.changeAnhMulti) {
          this.srcAnhChiTiet = this.anhChiTiet.map(a => {
            return {
              anh: a,
              type: 'base64'
            }
          })
        } else {
          this.srcAnhChiTiet = this.formData.anhChiTiet.map(a => {
            return {
              anh: a,
              type: 'src'
            }
          })        
        }
      }
    }
  },
  watch: {
    openKhuPhong () {
      if(this.openKhuPhong === false) {
        this.$store.dispatch('phong/getKhuPhongs')
      }
    },
    openLoaiPhong () {
      if(this.openLoaiPhong === false) {
        this.$store.dispatch('phong/getLoaiPhongs')
      }
    },
    value (v) {
      if(v) {
        this.$store.dispatch('phong/getKhuPhongs')
        this.$store.dispatch('phong/getLoaiPhongs')
        this.$store.dispatch('phong/getTinhTrangPhongs')
      }
      if (v && this.isThem === false) {
        if (this.phongSelect && this.phongSelect._id) {
          this.formData = _.cloneDeep(this.phongSelect)
          this.formData.tinhTrangPhongID = this.formData.tinhTrangPhongID._id
        }
      }
      else
      {
        this.formData = {
          soDien: 0,
          soNuoc: 0,
          giaPhong: 0,
          dKMang: false,
          homeFlag: false,
          hotFlag: false,
          status: false
      }
      }
    },
    formData () {
      this.getSrcAnhChinh()
      this.getSrcAnhChiTiet()
    },
    'anhChinh': 'getSrcAnhChinh',
    'anhChiTiet': 'getSrcAnhChiTiet'
  },
}