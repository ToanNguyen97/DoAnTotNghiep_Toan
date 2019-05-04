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
      total:0,
      page:1,
      pagination: {
        rowsPerPage: 4,
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
      this.pagination.page = this.page
      this.formData.pagination = this.pagination
      PhongServices.traCuu(this.formData).then( res => {
        if(res && res.docs.length > 0) {
          this.dsPhong = res.docs
          this.page = res.page
          this.total = res.pages
          toast.Info(`Có ${res.total} phòng được tìm thấy`)
          this.loading = false
        } else {
          toast.Show('Không có kết quả theo tìm kiếm')
          this.loading = false
          this.dsPhong = []
        }
      })
    } else {
        this.pagination.page = this.page
        PhongServices.getPhongsClient(this.pagination).then(res => {
          let data = res.data
          this.dsPhong = data.docs
          this.page = data.page
          this.total = data.pages
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
    },
    page () {
      this.pagination.page = this.page
      this.formData.pagination = this.pagination
      PhongServices.traCuu(this.formData).then( res => {
        if(res && res.docs.length > 0) {
          this.dsPhong = res.docs
          this.page = res.page
          this.total = res.pages
          this.loading = false
        } else {
          toast.Show('Không có kết quả theo tìm kiếm')
          this.loading = false
          this.dsPhong = []
        }
      })
    }
  },
  computed: {
    pages () {
      if (this.total === 0 ) {
        return 0
      } else {
        return this.total
      }  
    }
  },
  methods: {
    TimKiem () {
      this.loading = true
      this.pagination.page = this.page
      this.formData.pagination = this.pagination
      PhongServices.traCuu(this.formData).then( res => {
        if(res && res.docs.length > 0) {
          this.dsPhong = res.docs
          this.page = res.page
          this.total = res.pages
          toast.Info(`Có ${res.total} phòng được tìm thấy`)
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