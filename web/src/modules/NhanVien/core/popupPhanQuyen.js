import axios from 'axios'

export default {
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
      formData: {
        roles: []
      },
      roleGroupSelect:''
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
    }
  },
  methods: {
    XacNhan () {
      if(this.roleGroupSelect) {
        this.formData.idGroup = this.roleGroupSelect._id
      }
      axios.post(`http:${window.urlApi}api/role-group-add-role`,this.formData).then(res => {
        this.roleGroupSelect = res.data
        axios.get(`http:${window.urlApi}api/role-group`).then(res => {
          this.dsRoleGroup = res.data
        })
      })
    },
    Huy () {
      this.formData.roles = []
      this.roleGroupSelect = ''
      this.$emit('input',false)
    },
    getRoles () {
      console.log('vao day')
    }
  },
}