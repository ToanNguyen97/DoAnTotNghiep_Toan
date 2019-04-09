import axios from 'axios'


export default {
  data() {
    return {
      isValid: false      
    }
  },
  beforeCreate() {
    console.log('query', this.$route)
    axios.get('http://localhost:3003/api/hoan-tat-thanh-toan-paypal', {
      params: this.$route.query
    }).then(res => {
      this.isValid = res
    }).catch(err => {
      console.log(err)
    })
  }
}