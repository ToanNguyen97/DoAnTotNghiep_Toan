import validate from '../../../plugins/validation.js'
import axios from 'axios'
import toast from '../../../plugins/toast.js'
export default {
  props: {
    value : {
      type: Boolean
    }
  },
  data() {
    return {
      formData: {},
      valid: false,
      emailRules: [
        validate.required,
        validate.email
      ],
    }
  },
  created() {
    
  },
  methods: {
    async GetPass () {
      if (this.$refs.form.validate()) {
        let {data} = await axios.post(`${window.urlApi}api/get-password`, this.formData)
        if(data === true) {
          toast.Success('Vui lòng check mail để đổi mật khẩu')
        } else {
          toast.Error('Không tồn tại mail')
        }
      }
    },
    Huy () {
      this.formData = {}
      this.$refs.form.reset()
      this.$emit('input',false)
    }
  },
}