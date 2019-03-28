'use strict'

//import toast from '../../../plugins/toast.js'
import popupPhieuThuTien from '../core/popupPhieuThuTien.vue'
import moment from 'moment'
export default {
  components: {
    popupPhieuThuTien
  },
  data() {
    return {
      dsPhong: [],
      idKhuPhong: null,
      combo: "",
      phieuThuTienSelect: {},
      open: false,
      isThem: false,
      edit: false,
      disabled: true,
      pagination: {},
      selected: [],
      headers: [
        { text: 'Tên Phòng',value: '_id' },
        { text: 'Số Điện', value: 'phongID' },
        { text: 'Số Nước', value: 'moTa' },
        { text: 'Tình Trạng Phiếu Thu' },
        { text: 'Thao Tác', value: '' }
      ],
      loading: true, 
    }
  },
  created() {
    this.loading = false
  // this.$store.dispatch('getPhieuThuTiens')
    this.$store.dispatch('phong/getKhuPhongs').then( () => {
      this.idKhuPhong = this.dsKhuPhong[0]
    })
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.dsPhong.length / this.pagination.rowsPerPage)
    },
    dsPhieuThuTien () {
      return this.$store.state.phieuthutien.dsPhieuThuTien
    },
    dsKhuPhong () { 
      return this.$store.state.phong.dsKhuPhong
    }
  },
  watch: {
    selected () {
      if(this.selected && this.selected.length == 0)
      {
        this.disabled = true
      }
      else
      {
        this.disabled = false
      }
    },
    dsKhuPhong () {
      this.dsPhong = []
      this.idKhuPhong = this.dsKhuPhong[0]
      for(let item of this.dsKhuPhong) {
        if(item._id === this.idKhuPhong._id)
        {
          for(let phong of item.dsPhong) {
            if(String(phong.tinhTrangPhongID) === String("5c8866adfcd238559ca25d14")) {
              this.dsPhong.push(phong)              
            }
          }
          break
        }
      }

    },
    idKhuPhong (v) {
      this.dsPhong = []
      for(let item of this.dsKhuPhong) {
        if(item._id === v._id)
        {
          for(let phong of item.dsPhong) {
            if(phong.tinhTrangPhongID === "5c8866adfcd238559ca25d14"  || phong.tinhTrangPhongID === "5c8866b6fcd238559ca25d15" ) {
              this.dsPhong.push(phong)
            }
          }
          break
        }
      }
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) 
      {
        this.selected = []
      }
      else
      {
        this.selected = this.dsPhong.slice()
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    OpenThem (item) {
      this.isThem = true
      this.edit = true
      let {tenPhong, anhChinh, soDien, soNuoc} = item
      this.phieuThuTienSelect = {phongID: item._id, tenPhong, anhChinh, soDien, soNuoc}
    },
    OpenTimKiem () {
      this.open = true
    },
    GotoEdit(item) {
      this.isThem = false
      this.edit = true
      let {tenPhong, anhChinh, soDien, soNuoc} = item
      this.phieuThuTienSelect = {phongID: item._id, tenPhong, anhChinh, soDien, soNuoc}
    },
    ResetPage () {
      this.idKhuPhong = null
      this.$store.dispatch('phong/getKhuPhongs').then( () => {
        this.idKhuPhong = this.dsKhuPhong[0]
      })
    }
  },
  filters: {
    formarDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    checkPhieuThu (phieuThus) {
      let phieuThu = {}
      if(phieuThus && phieuThus.length === 0) {
        phieuThu = {
          label: 'Chưa lập',
          value: 'c'
        }
        return phieuThu
      }
      else {
        let today = moment(Date.now()).format('DD/MM/YYYY')
        let date = ''
        for(let item of phieuThus) {
          date = moment(item.ngayLap).format('DD/MM/YYYY')
          if(date.substring(date.indexOf('/')) === today.substring(today.indexOf('/'))) {
            if(item.tinhTrangPhieuThu === 'chưa đóng') {
              phieuThu = {
                label: item.tinhTrangPhieuThu,
                value: 'cd'
              }
            } else if(item.tinhTrangPhieuThu === 'đã đóng') {
              phieuThu = {
                label: item.tinhTrangPhieuThu,
                value: 'dd'
              }
            } else {
              phieuThu = {
                label: item.tinhTrangPhieuThu,
                value: 'qh'
              }
            }
            
            break
          }
        }
        if(phieuThu && !phieuThu.value) {
          phieuThu = {
            label: 'Chưa lập',
            value: 'c'
          }
        }
        return phieuThu
      }
    }
  }
}