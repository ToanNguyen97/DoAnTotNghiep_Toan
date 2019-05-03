import PhongServices from '../../../modules/Phong/Phongservices.js'
import _ from 'lodash'
import toast from '../../../plugins/toast.js'
export default {
  data() {
    return {
      dsLoaiPhong: [],
      dsTinhTrangPhong: [],
      formData: {tinhTrangPhongSelect: []},
      dsPhong: [],
      loading: false,
      pagination: {
        rowsPerPage: 4
      }
    }
  },
  created() {
    PhongServices.getLoaiPhongs().then(res => {
      this.dsLoaiPhong = res.data
    })
    PhongServices.getTinhTrangPhongs().then(res => {
      this.dsTinhTrangPhong = res.data
    })
    if(!_.isEmpty(this.$route.query)) {
      this.formData = this.$route.query
      PhongServices.traCuu(this.formData).then( res => {
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
    } else {
        PhongServices.getPhongs().then(res => {
        this.dsPhong = res.data
      })
    }
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
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null
      ) return 0
      return Math.ceil(this.dsPhong.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    TimKiem () {
      this.loading = true
      PhongServices.traCuu(this.formData).then( res => {
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