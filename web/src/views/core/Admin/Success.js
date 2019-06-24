import axios from 'axios'

export default {
  data() {
    return {
      isValid: false      
    }
  },
  created () {
    console.log('query', this.$route)
    axios.get('http://localhost:3003/api/hoan-tat-thanh-toan-paypal', {
      params: this.$route.query
    }).then(res => {
      console.log(res)
      if(res.data.idKhachPayPalGlobal) {
        this.isValid = true
        this.$store.dispatch('layoutkhach/getDetailKhach', res.data.idKhachPayPalGlobal)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}