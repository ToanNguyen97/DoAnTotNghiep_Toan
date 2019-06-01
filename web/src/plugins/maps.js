import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBFvbI_PTcNv6_KY8evIkys5FUH-KDwPWs",
    libraries: "places",
    region: 'VI',
    language: 'vi',
  }
})