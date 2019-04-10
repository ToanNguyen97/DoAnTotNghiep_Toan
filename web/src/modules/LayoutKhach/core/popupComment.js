export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    idPhong: ''
  },
  created() {
    this.url = "http://localhost:8080/thong-tin-chi-tiet-phong-"+ this.idPhong +".html"
  },
  data() {
    return {
      url: ''
    }
  },
  watch: {
    value (v) {
      if(v) {
        this.url ="http://localhost:8080/thong-tin-chi-tiet-phong-"+ this.idPhong +".html"
      }
    }
  },
}