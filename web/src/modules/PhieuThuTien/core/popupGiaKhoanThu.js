import axios from 'axios'
import toast from '../../../plugins/toast.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: [
        {text: 'Tên Khoản Thu', value: 'tenKhoanThu', align:'left' },
        {text: 'Giá Khoản Thu', value: 'giaKhoanThu', align:'left' },
        {text: 'Đơn Vị Tính', value: 'donViTinh', align:'left' },
      ],
      dsKhoanThu: [],
      pagination:{
        rowsPerPage: 4
      },
      formData: {},
      loading: false
    }
  },
  methods: {
    Huy () {
      this.$emit('input', false)
    },
    XacNhan () {
      if(this.formData && this.formData.tenKhoanThu) {
        this.loading = true
        axios.post(`http:${window.urlApi}api/cackhoanthu`,this.formData).then(res => {
          if(res.data && res.data._id) {
            this.formData = {}
            toast.Success('Thêm thành công!')
            axios.get(`http:${window.urlApi}api/cackhoanthu`).then(res => {
              this.dsKhoanThu = res.data
            })
          } else {
            toast.Error('có lỗi')
          }
          this.loading = false
        })
      }
    },
    Edit (item) {
      this.formData = {
        _id: item._id,
        tenKhoanThu: item.tenKhoanThu,
        giaKhoanThu: item.giaKhoanThu,
        donViTinh: item.donViTinh
      }
      axios.post(`http:${window.urlApi}api/cackhoanthu`,this.formData).then(res => {
        if(res.data && res.data._id) {
          toast.Success('sửa thành công!')
          this.formData = {}
          axios.get(`http:${window.urlApi}api/cackhoanthu`).then(res => {
            this.dsKhoanThu = res.data
          })
        } else {
          toast.Error('có lỗi')
        }
        this.loading = false
      })
      }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.dsKhoanThu.length == 0
      ) return 0

      return Math.ceil(this.dsKhoanThu.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    value (v) {
      if(v) {
        axios.get(`http:${window.urlApi}api/cackhoanthu`).then(res => {
          this.dsKhoanThu = res.data
        })
      }
    }
  },
}