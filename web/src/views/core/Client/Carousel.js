import MenuTop from './MenuTop.vue'
import PhongServices from '../../../modules/Phong/Phongservices.js'
import loading from '../../../views/loading.vue'
export default {
  components: {
    MenuTop,
    loading
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
  methods: {
    TimKiem () {
      this.$router.push({path:'/danh-sach-phong-tro.html', query: this.formData})
    }
  },
}