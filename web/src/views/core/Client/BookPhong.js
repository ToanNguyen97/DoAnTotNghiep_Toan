import phongServices from '../../../modules/Phong/Phongservices'
import popupBook from './PopUpBookPhong.vue'
import popupLienHe from './LienHe.vue'
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
      dsPhongCungLoai: []
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
    this.dsPhongCungLoai = await phongServices.traCuu(payload)
  },
  filters: {
    formatCurrentcy (tien) {
      return tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
  }
}