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
        {text: 'Tên nhóm', value: 'nameRoleGroup' },
        {text: 'Số lượng nhân viên', value: 'nameRoleGroup' }
      ],
      dsRoleGroup: [],
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
      if(this.formData && this.formData.nameRoleGroup) {
        this.loading = true
        axios.post(`http:${window.urlApi}api/role-group`,this.formData).then(res => {
          if(res.data && res.data._id) {
            this.formData = {}
            toast.Success('Thêm nhóm thành công!')
            axios.get(`http:${window.urlApi}api/role-group`).then(res => {
              this.dsRoleGroup = res.data
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
        nameRoleGroup: item.nameRoleGroup
      }
      this.loading = true
      axios.post(`http:${window.urlApi}api/role-group`,this.formData).then(res => {
        if(res.data && res.data._id) {
          toast.Success('sửa nhóm thành công!')
          this.formData = {}
          axios.get(`http:${window.urlApi}api/role-group`).then(res => {
            this.dsRoleGroup = res.data
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
        this.dsRoleGroup.length == 0
      ) return 0

      return Math.ceil(this.dsRoleGroup.length / this.pagination.rowsPerPage)
    }
  },
  watch: {
    value (v) {
      if(v) {
        axios.get(`http:${window.urlApi}api/role-group`).then(res => {
          this.dsRoleGroup = res.data
        })
      }
    }
  },
}