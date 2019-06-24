import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    DetailCTPT: {}
  },
  data() {
    return {
      tenThang: '',
      tongTien: 0,
      tiGia: 0
    }
  },
  methods: {
    
  },
  filters: {
    formatDate (ngay) {
      return moment(ngay).format('DD/MM/YYYY')
    },
    formatCurrentcy (tien) {
      return tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
  },
  watch: {
    value (v) {
      if(v) {
        let phieuThu = _.cloneDeep(this.DetailCTPT)
        this.tenThang = moment(phieuThu.ngayLap).format('MM')
        this.tongTien = phieuThu.dsCTPT.reduce((tongTien, current) => {
          return (current.chiSoMoi && current.chiSoMoi >0)?tongTien + (current.chiSoMoi - current.chiSoCu) * current.donGia : tongTien + current.donGia
         },0)
        axios.get(`${window.urlApi}api/lay-ty-gia-ngoai-te`).then(res => {
          this.tiGia = res.data
        }).catch(err => {
          return err
        })
      }
    }
  },
}