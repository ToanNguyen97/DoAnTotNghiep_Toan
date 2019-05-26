import _ from 'lodash'
import toast from '../../../plugins/toast.js'
export default {
  props: {
    value: {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      formData: {},
      changePass: false
    }
  },
  created() {
    
  },
  computed: {
    
  },
  methods: {
    Huy () {
      this.changePass = false
      this.$emit('input',false)
    },
    Luu () {
      // sẽ cập nhật tài khoản theo roles
      let user = this.$store.state.auth.user
      if(user.rolesGroupID._id === '5cc565b39f49904f20b6211f') {
        this.formData.khachThueID = user.userInfo._id
      }
      else {
        this.formData.nhanVienID = user.userInfo._id
      }
      this.$store.dispatch('auth/editUser',this.formData).then(res => {
        if(res.user && res.isPassword === true) {
          toast.Success('Cập nhật thành công! Vui lòng đăng nhập lại')
          this.$router.push('/login')
        }
        else if(res.user && res.isPassword === false) {
          toast.Error('Mật khẩu không đúng')
        }
        else {
          toast.Error('Có lôi')
        }
      })
    }
  },
  watch: {
    value (v) {
      if(v) {
        let User = _.cloneDeep(this.$store.state.auth.user)
        this.formData = {
          userName: User.userName,
          email: User.email
        }
      }
    }
  },
}