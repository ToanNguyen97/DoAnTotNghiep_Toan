import MenuTop from './MenuTop.vue'
import PhongServices from '../../../modules/Phong/Phongservices.js'
export default {
  components: {
    MenuTop
  },
  data () {
    return {
      dsLoaiPhong: [],
      dsTinhTrangPhong: [],
      formData: {tinhTrangPhongSelect: []},
    }
  },
  created() {
    PhongServices.getLoaiPhongs().then(res => {
      this.dsLoaiPhong = res.data
    })
    PhongServices.getTinhTrangPhongs().then(res => {
      this.dsTinhTrangPhong = res.data
    })
  },
  watch: {
    isOGhep (v) {
      if(v) {
        this.isConTrong = false
      }
    },
    isConTrong (v) {
      if(v) {
        this.isOGhep = false
      }
    }
  },
  methods: {
    TimKiem () {
      this.$router.push({path:'/danh-sach-phong-tro.html', query: this.formData})
    }
  },
}