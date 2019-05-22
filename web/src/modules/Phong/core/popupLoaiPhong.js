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
        {text: 'Tên Loại Phòng', value: 'tenLoaiPhong', align:'left' },
        {text: 'Giá Phòng', value: 'giaPhong', align:'left' },
      ],
      dsLoaiPhong: [],
      pagination:{
        rowsPerPage: 3
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
      if(this.formData && this.formData.tenLoaiPhong) {
        this.loading = true
        axios.post(`http:${window.urlApi}api/loaiphong`,this.formData).then(res => {
          if(res.data && res.data._id) {
            this.formData = {}
            toast.Success('Thêm thành công!')
            axios.get(`http:${window.urlApi}api/loaiphong`).then(res => {
              this.dsLoaiPhong = res.data
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
        tenLoaiPhong: item.tenLoaiPhong,
        giaPhong: item.giaPhong,
      }
      axios.put(`http:${window.urlApi}api/loaiphong/${item._id}`,this.formData).then(res => {
        if(res.data && res.data._id) {
          toast.Success('sửa thành công!')
          this.formData = {}
          axios.get(`http:${window.urlApi}api/loaiphong`).then(res => {
            this.dsLoaiPhong = res.data
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
        this.dsLoaiPhong.length == 0
      ) return 0

      return Math.ceil(this.dsLoaiPhong.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    value (v) {
      if(v) {
        axios.get(`http:${window.urlApi}api/loaiphong`).then(res => {
          this.dsLoaiPhong = res.data
        })
      }
    }
  },
}