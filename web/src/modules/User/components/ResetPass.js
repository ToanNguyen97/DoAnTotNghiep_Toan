import axios from 'axios'
import validation from '../../../plugins/validation.js'
import toast from '../../../plugins/toast.js'
export default {
  data() {
    return {
      password: '',
      account: {},
      valid: false,
      loading: false,
      xacnhanpassword: '',
      passWordRules: [
        v => (v === this.password) || 'Không khớp mật khẩu',
        validation.required
      ],
      passWord1Rules: [
        validation.required
      ]

    }
  },
  async created() {
    let {data} = await axios.get(`${window.window.urlApi}api/get-user-reset-password-${this.$route.params.id}`)
    this.account = data
  },
  methods: {
    DoiMatKhau () {
      this.loading = true
      if(this.$refs.form.validate()) {
        this.loading = false
        this.account.newPass = this.password
        axios.post(`${window.urlApi}api/doi-mat-khau`,{account: this.account}).then(res => {
          if(res.data === true) {
            toast.Success('Đổi mật khẩu thành công!')
          } else 
          {
            toast.Error('Thất bại')
          }
        })
      } else {
        this.loading = false
      }
    },
    Refresh () {
      this.password = ''
      this.xacnhanpassword = ''
      this.$refs.form.reset()
    }
  },
}