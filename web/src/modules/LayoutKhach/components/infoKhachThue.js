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
    this.infoKhach = this.$store.state.layoutkhach.khachThue
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
        this.$store.dispatch('layoutkhach/getDetailKhach', this.infoKhach._id)
      }
    }
  },
  filters: {
    formatDate(date) {
      return date ? moment(date).format('DD/MM/YYYY') : ''
    }
  }
}