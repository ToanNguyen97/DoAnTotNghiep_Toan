import axios from 'axios'
export default {
  data() {
    return {
			loading: false,
			account: {}
    }
  },
  created() {
    this.loading = true
    axios.get(`${window.urlApi}api/kich-hoat-tai-khoan-${this.$route.params.id}`).then( res => {
      this.loading = true
      console.log(res)
			this.account = res.data
    }).catch(err => {
      console.log(err)
    })
	}
}