import axios from 'axios'
import toast from '../../../plugins/toast.js'
import popupRoleGroup from './popupRoleGroup.vue'
export default {
  components: {
    popupRoleGroup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dsRoleGroup: [],
      dsRole: [],
      loading: false,
      formData: {
        roles: []
      },
      roleGroupSelect:'',
      openRoleGroup: false
    }
  },
  watch:{
    value (v) {
      if(v) {
        axios.get(`http:${window.urlApi}api/role-group`).then(res => {
          this.dsRoleGroup = res.data
        })
        axios.get(`http:${window.urlApi}api/role`).then(res => {
          this.dsRole = res.data
        })
      }
    },
    roleGroupSelect () {
      if(this.roleGroupSelect) {
        this.formData.roles = this.roleGroupSelect.roles.map(item => item._id)
        return this.formData.roles
      }
      return ''
    },
    openRoleGroup () {
      if(this.openRoleGroup === false) {
        axios.get(`http:${window.urlApi}api/role-group`).then(res => {
          this.dsRoleGroup = res.data
        })
      }
    }
  },
  methods: {
    XacNhan () {
      this.loading = true
      if(this.roleGroupSelect) {
        this.formData.idGroup = this.roleGroupSelect._id
      }
      axios.post(`http:${window.urlApi}api/role-group-add-role`,this.formData).then(res => {
        this.roleGroupSelect = res.data
        toast.Success('Phân quyền thành công!')
        axios.get(`http:${window.urlApi}api/role-group`).then(res => {
          this.dsRoleGroup = res.data
          this.loading = false
        })
      })
    },
    Huy () {
      this.formData.roles = []
      this.roleGroupSelect = ''
      this.$emit('input',false)
    }
  },
}