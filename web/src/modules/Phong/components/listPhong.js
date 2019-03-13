export default {
  data() {
    return {
      dialog: false,
      valid: true,
      tenPhong: '',
      khuPhongId: '',
      loaiPhongId: '',
      anhChinh: '',
      anhChiTiet: [],
      moTa: '',
      anhChiTietName:[],
      image: '',
      soDien: 0,
      soNuoc: 0,
      giaPhong: 0,
      dKMang: false,
      status: false,
      homeFlag: false,
      hotFlag: false,
      tenPhongRules: [
        v => !!v || 'Không được để trống',
        v => (v && v.length <= 20) || 'Tên tối đa 20 ký tự'
      ],
    }
  },
  created() {
    this.$store.dispatch('getPhongs')
    this.$store.dispatch('getKhuPhongs')
    this.$store.dispatch('getLoaiPhongs')
    this.$store.dispatch('getTinhTrangPhongs')
  },
  computed: {
    dsPhong () {
      return this.$store.state.phong.dsPhong
    },
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
      this.$refs['file'].click()
    },
    chooseFIleMulti () {
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
    ThemPhong () {
      let anhChinh = {name: this.image, file64: this.anhChinh}
      let anhChiTiet = {name: this.anhChiTietName, file64: this.anhChiTiet}
      let payload = {tenPhong: this.tenPhong, anhChinh: anhChinh, anhChiTiet: anhChiTiet, moTa: this.moTa, soDien: this.soDien, soNuoc: this.soNuoc, giaPhong: this.giaPhong, dKMang: this.dKMang,
        status: this.status, homeFlag: this.homeFlag, hotFlag: this.hotFlag, tinhTrangPhongID: "5c88669ffcd238559ca25d13", khuPhongID: this.khuPhongId, loaiPhongID: this.loaiPhongId}
      this.$store.dispatch('themPhong', payload) 
    }
  },
}