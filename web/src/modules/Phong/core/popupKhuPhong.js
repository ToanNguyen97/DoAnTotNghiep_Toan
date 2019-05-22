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
        {text: 'Tên Khu Phòng', value: 'tenKhuPhong', align:'left' },
        {text: 'Mô Tả', value: 'moTa', align:'left' },
      ],
      dskhuPhong: [],
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
      if(this.formData && this.formData.tenKhuPhong) {
        this.loading = true
        this.formData.anhKhuPhong = "anhkhuphong"
        axios.post(`http:${window.urlApi}api/khuphong`,this.formData).then(res => {
          if(res.data && res.data._id) {
            this.formData = {}
            toast.Success('Thêm nhóm thành công!')
            axios.get(`http:${window.urlApi}api/khuphong`).then(res => {
              this.dskhuPhong = res.data
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
        tenKhuPhong: item.tenKhuPhong,
        anhKhuPhong: item.anhKhuPhong,
        moTa: item.moTa
      }
      axios.put(`http:${window.urlApi}api/khuphong/${item._id}`,this.formData).then(res => {
        if(res.data && res.data._id) {
          toast.Success('sửa nhóm thành công!')
          this.formData = {}
          axios.get(`http:${window.urlApi}api/khuphong`).then(res => {
            this.dskhuPhong = res.data
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
        this.dskhuPhong.length == 0
      ) return 0

      return Math.ceil(this.dskhuPhong.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    value (v) {
      if(v) {
        axios.get(`http:${window.urlApi}api/khuphong`).then(res => {
          this.dskhuPhong = res.data
        })
      }
    }
  },
}