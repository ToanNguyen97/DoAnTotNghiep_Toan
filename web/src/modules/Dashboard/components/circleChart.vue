<template>
  <v-flex md6 lg6  >
    <v-card>
      <v-card-title>Thống kê tình trạng phiếu thu tháng: {{month}}</v-card-title>
      <v-card-text class="pa-0" style="display:flex; justify-content:center; height: 259px;">
        <apexchart width="380" type="pie" :options="options" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  props: {
    series: Array,
    month: String,
  },
  components: {
    apexchart: VueApexCharts,
  },
  data: function() {
    return {
      options: {
       labels: ['Chưa đóng', 'Đã đóng', 'Quá hạn']
      },
      //series: [44, 55, 41]
    }
  },
}
</script>
