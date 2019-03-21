import _ from 'lodash'
import toast from '../../../plugins/toast'
import translateCharacter from '../../../plugins/translateCharacter.js'
import moment from 'moment'
export default {
  props:{
    HopDongThuePhongSelect: {
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
      menu1: false,
      formData: {},
      soHD: 'HD',
      phong: null,
      soDienThoai: null,
      khachThue: null,
      khuPhongID: null,
      phongID: null,
      dsPhong: null
    }
  },
  computed: {
    dsKhuPhong () {
      return this.$store.state.phong.dsKhuPhong
    },
    formatNgayLap () {      
      return this.formData.ngayLap ? moment(this.formData.ngayLap).format('DD/MM/YYYY') : moment(Date.now()).format('DD/MM/YYYY')
    },
    formatngayKetThuc () {
      return this.formData.ngayKetThuc ? moment(this.formData.ngayKetThuc).format('DD/MM/YYYY') : ''
    }
  },
  methods: {
    Huy () {
      this.soHD = null
      this.khuPhongID = null
      this.phongID = null
      this.soDienThoai = null
      this.phong = null
      this.khachThue = null
      this.$emit('input', false)
    },
    XacNhan () {
      this.formData._id = this.soHD
      this.formData.khachThueID = this.khachThue._id
      this.formData.phongID = this.phong._id
      // chỗ này bị xung đột hàm nếu dispatch đến hàm save sẽ phân vân save của khach hay của hợp đồng nên phai đổi tên hàm
      this.$store.dispatch('saveHopDong', this.formData).then(res => {       
        toast.Success(`Hợp đồng ${res._id} đã được lập`)
        this.Huy()
      }).catch( () => {
        toast.Error('Lỗi!')  
      })
    },
    infoKhachThue () {
      if(this.soDienThoai === null || this.soDienThoai === '' || this.soDienThoai === undefined)
      {
        toast.Error('Vui lòng nhập số điện thoại')
      }
      else
      {
        this.$store.dispatch('getKhachBySDT', this.soDienThoai).then( res => {
        this.khachThue = res[0]      
        })
      }
    },
    getPhong (id) {
      for(let item of this.dsKhuPhong) {
        if(item._id == id) {
          this.dsPhong = item.dsPhong
          break
        }
      }
    },
    infoPhong () {
      if (this.khuPhongID === null || this.khuPhongID === '' || this.khuPhongID === undefined || this.phongID === '' || this.phongID === null)
      {
        toast.Error('Vui lòng chọn khu phòng hoặc phòng')
      }
      else
      {
        this.$store.dispatch('getPhongById', this.phongID).then( res => {
          this.phong = res
          this.soHD = ''
          // lưu ý số hợp đồng cần thêm tên phòng vì khách có thể thuê nhiều phòng
          this.soHD = 'HD' + moment(this.formData.ngayLap).format('DDMMYYYY') + this.khachThue.soCMND + translateCharacter(this.phong.tenPhong)
        })
      }
    }
  },
  watch: {   
    value (v) {
      if (v) {
        this.$store.dispatch('getKhuPhongs')
        this.$store.dispatch('getLoaiKhachs')
      }
      if (v && this.isThem === false) {
        if (this.HopDongThuePhongSelect && this.HopDongThuePhongSelect._id) {
          this.formData = _.cloneDeep(this.HopDongThuePhongSelect)
          this.soHD = this.formData._id
          this.khachThue = this.formData.khachThueID
          this.phong = this.formData.phongID
          if (this.formData && this.formData.ngayLap){
            this.formData.ngayLap = new Date(this.formData.ngayLap).toISOString().substr(0, 10)
          }
          if (this.formData && this.formData.ngayKetThuc){
            this.formData.ngayKetThuc = new Date(this.formData.ngayKetThuc).toISOString().substr(0, 10)
          }
        }
      }
      else
      {
        this.formData = {}
      }
    }
  },
}