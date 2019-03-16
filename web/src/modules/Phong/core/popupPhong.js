import _ from 'lodash'
import toast from '../../../plugins/toast'
export default {
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
  data() {
    return {
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
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 20) || 'Tên tối đa 20 ký tự'
      ],
      uploadingPhoto: false,
      srcAnhChinh: null,
      srcAnhChiTiet: null
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
      this.formData = {
        soDien: 0,
        soNuoc: 0,
        giaPhong: 0,
        dKMang: false,
        homeFlag: false,
        hotFlag: false,
        status: false
      }
      this.$refs.form.reset()
      this.anhChinh = null
      this.anhChiTiet = []
      this.image = null
      this.anhChiTietName = []
      this.changeAnh = false
      this.changeAnhMulti = false
      this.$emit('input', false)
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
      this.formData.tinhTrangPhongID = "5c88669ffcd238559ca25d13"
      if(this.formData.khuPhongID._id)
      {
        this.formData.khuPhongID = this.formData.khuPhongID._id
      }
      if(this.formData.loaiPhongID._id)
      {
        this.formData.loaiPhongID = this.formData.loaiPhongID._id
      }
      this.$store.dispatch('XacNhan', this.formData).then(() => {
        toast.Info('Thành Công!')
        this.Huy()
      })
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
    value (v) {
      if (v && this.isThem === false) {
        if (this.phongSelect && this.phongSelect._id) {
          this.formData = _.cloneDeep(this.phongSelect)
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