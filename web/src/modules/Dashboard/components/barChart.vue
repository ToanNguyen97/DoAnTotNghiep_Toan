<template>
  <v-flex md6 lg6 >
    <v-card>
      <v-card-title>Thống kê doanh thu</v-card-title>
      <v-content style="height: 259px;" class="pa-0">
        <apexcharts width="500" height="250" type="bar" :options="chartOptions" :series="series"></apexcharts>
      </v-content>
    </v-card>
  </v-flex> 
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6','Th.7', 'Th.8', 'Th.9','Th.10','Th.11','Th.12']
        },
      },
      series: [{
        name: 'Tổng tiền',
        data: [182511,242111,192511,246111, 242611,242514, 246511, 232511,212511,222511,242511,251110]
      }]
    }
  },
}
</script>
