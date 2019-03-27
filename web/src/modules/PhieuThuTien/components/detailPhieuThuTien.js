export default {
  data() {
    return {
      phong: {}
    }
  },
  beforeCreate () {
   this.$store.dispatch('phong/getPhongById',this.$route.params.id).then( res => {
     this.phong = res
   })
  }
}