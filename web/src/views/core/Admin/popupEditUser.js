import _ from 'lodash'
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