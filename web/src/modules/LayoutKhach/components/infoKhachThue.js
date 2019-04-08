import _ from 'lodash'
import moment from 'moment'
export default {
  data() {
    return {
      infoKhach: Object,
      menu:false,
      genders: [{value:true, ten:'Nam'}, {value: false, ten: 'Nữ'}]
    }
  },
  created() {
  },
  computed: {
    userInfo () {
      return this.$store.state.auth.user.userInfo
    }
  },
  methods: {
    
  },
  watch: {
    userInfo () {
      if(this.userInfo && this.userInfo._id) {
        this.infoKhach = _.cloneDeep(this.userInfo)
      }
    }
  },
  filters: {
    formatDate(date) {
      return date ? moment(date).format('DD/MM/YYYY') : ''
    }
  }
}