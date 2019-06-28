import LineChart from './barChart.vue'
import CirleChart from './circleChart.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    Chart: LineChart,
    CirleChart
  },
  data: function() {
    return {

    }
  },
  created() {
    this.$store.dispatch('getKhachs')
    this.$store.dispatch('phong/getPhongs')
    this.$store.dispatch('getListHopDongThuePhong')
    this.$store.dispatch('getPhieuThuTiens')
  },
  computed: {
    ...mapGetters({
        countKhach: 'countKhach',
        countPhong: 'phong/countPhong',
        countHopDong: 'countHopDong',
        countMoney: 'countMoney',
        countPercentTinhTrang: 'countPercentTinhTrang',
        countDoanhThuNam: 'countDoanhThuNam'
    })
  },
}