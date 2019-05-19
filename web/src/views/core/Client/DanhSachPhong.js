import PhongServices from '../../../modules/Phong/Phongservices.js'
import _ from 'lodash'
import toast from '../../../plugins/toast.js'
import popUpBook from './PopUpBookPhong.vue'
export default {
  components:{
    popUpBook
  },
  data() {
    return {
      dsLoaiPhong: [],
      phongSelected: {},
      openBooked: false,
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
      if(this.$route.query.tinhTrangPhongSelect && !Array.isArray(this.$route.query.tinhTrangPhongSelect))
      {
        this.$route.query.tinhTrangPhongSelect = [this.$route.query.tinhTrangPhongSelect]
      }
      // else {
      //   this.$route.query.tinhTrangPhongSelect = []
      // }
      this.formData = this.$route.query
      this.pagination.page = this.page
      this.formData.pagination = this.pagination
      PhongServices.traCuu(this.formData).then( res => {
        this.dsPhong = []
        if(res && res.docs.length > 0) {
          this.dsPhong = res.docs
          this.page = res.page
          this.total = res.pages
          toast.Info(`Có ${res.total} phòng được tìm thấy`)
          this.loading = false
        } else {
          toast.Error('Không có kết quả theo tìm kiếm')
          this.loading = false
          this.dsPhong = []
        }
      }).catch(err => {
        toast.Error('Lỗi', err)
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
    page () {
      this.pagination.page = this.page
      this.formData.pagination = this.pagination
      PhongServices.traCuu(this.formData).then( res => {
        // this.dsPhong = []
        if(res && res.docs.length > 0) {
          // check xem nếu có số lượng đặt lớn hơn 4 thì mình disable nút đặt ngay
          this.dsPhong = res.docs
          this.page = res.page
          this.total = res.pages
          this.loading = false
        } else {
          toast.Error('Không có kết quả theo tìm kiếm')
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
    openBook (phong) {
      this.phongSelected = phong
      this.openBooked = true
    },
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
          toast.Error('Không có kết quả theo tìm kiếm')
          this.loading = false
          this.dsPhong = []
        }
      })
    }
  },
}