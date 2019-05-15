import phongServices from '../../../modules/Phong/Phongservices'
import popupBook from './PopUpBookPhong.vue'
import popupLienHe from './LienHe.vue'
import axios from 'axios'
import toast from '../../../plugins/toast.js'
export default {
  components: {
    popupBook,
    popupLienHe
  },
  data() {
    return {
      openPopupBook: false,
      openPopupLienHe: false,
      phongDetail: {},
      rating:5,
      dsPhongCungLoai: [],
      disabled: false,
      dark: true
    }
  },
  async created() {
    this.phongDetail = await phongServices.getPhongByIdCLI(this.$route.params.id)
    let payload = {
      pagination:{
        page:1,
        rowsPerPage: 5,
      },
      loaiPhong: this.phongDetail.loaiPhongID._id
    }
    // check xem nếu có số lượng đặt lớn hơn 4 thì mình disable nút đặt ngay
    axios.get(`${window.urlApi}api/check-so-luong-dat-${this.$route.params.id}`).then(res => {
      if(res.data === true)
      {
        toast.Info('Rất tiếc đã đủ số lượng khách đặt, vui lòng để lại thông tin chúng tôi sẽ liên hệ')
        this.disabled = true;
        if(this.disabled === true) {
          this.dark = false
        }
      }
    })
    this.dsPhongCungLoai = await phongServices.traCuu(payload)
  },
  filters: {
    formatCurrentcy (tien) {
      return tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
  }
}