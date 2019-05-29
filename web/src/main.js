import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/toast'
import VueCarousel from 'vue-carousel'
import VeeValidate from 'vee-validate'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance);
Vue.use(VeeValidate);
Vue.use(VueCarousel);

window.urlImage = '//localhost:3003/image/'
window.urlApi = '//localhost:3003/'


Vue.config.productionTip = false
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')    


