// import _ from 'lodash'
import moment from 'moment'
import toast from '../../../plugins/toast.js'
import axios from 'axios'
export default {
  data() {
    return {
      infoKhach: {type: Object} ,
      menu:false,
      genders: [{value:true, ten:'Nam'}, {value: false, ten: 'Nữ'}],
      anhDaiDien: '',
      image: '',
      changeAnh: false,
      gioiTinh: [
        {
          value: true,
          text: 'Nam'},
        {
          value: false,
          text: 'Nữ'
      }]
    }
  },
  created() {
    this.$store.dispatch('layoutkhach/getDetailKhach', this.$store.state.auth.user.userInfo._id).then(res => {
      this.infoKhach = res.khachThue
      if(this.infoKhach && this.infoKhach.anhDaiDien) {
        this.anhDaiDien = `//localhost:3003/image/${this.infoKhach.anhDaiDien}`
        this.infoKhach.ngaySinh = new Date(this.infoKhach.ngaySinh).toISOString().substr(0, 10)
      }
    })
  },
  computed: {
    khachThue () {
     return this.$store.state.layoutkhach.khachThue
    },
    computedDateFormattedMomentjs () {
      return this.infoKhach.ngaySinh ? moment(this.infoKhach.ngaySinh).format('DD/MM/YYYY') : ''
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
          this.anhDaiDien = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0].name
    },
    chooseFIle () {
      if(this.infoKhach.anhDaiDien)
      {
        this.changeAnh = true
      }
      this.$refs['file'].click()
    },
    XacNhan () {
      if(this.image != "")
      {
        let anhDaiDien = {name: this.image, file64: this.anhDaiDien}
        this.infoKhach.anhDaiDien = anhDaiDien
      }
      else
      {
        this.infoKhach.anhDaiDien = {name: "", file64: ""}
      }
      if(this.infoKhach.loaiKhachThueID && this.infoKhach.loaiKhachThueID._id) {
        this.infoKhach.loaiKhachThueID = this.infoKhach.loaiKhachThueID._id
      }
      axios.post('http://localhost:3003/api/khachthue', this.infoKhach).then(res => {
        if(res.data) {
        this.$store.dispatch('layoutkhach/setKhach', res.data)
        this.$store.dispatch('auth/setUserInfo',res.data)
        toast.Success('Cập nhật thành công!')
         } else {
          toast.Error('Lỗi !')
         }}).catch(err => {
          toast.Error(err)
        })
  }}
}