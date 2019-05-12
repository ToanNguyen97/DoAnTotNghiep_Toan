import PhongServices from '../Phongservices.js' 
import toast from '../../../plugins/toast.js'
export default {
  data() {
    return {
      isMang: false,
      loading: false,
      formData: {tinhTrangPhongSelect: []},
      ketqua: 0,
      dsLoaiPhong: [],
      dsTinhTrangPhong: [],
      dsPhong: []
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
      this.loading = true
      PhongServices.traCuuAdmin(this.formData).then( res => {
        if(res && res.length > 0) {
          this.dsPhong = res
          this.ketqua = res.length
          toast.Info(`Có ${res.length} phòng được tìm thấy`)
          this.loading = false
        } else {
          toast.Show('Không có kết quả theo tìm kiếm')
          this.loading = false
          this.dsPhong = []
        }
      })
    }
  },
}