import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/toast'

window.urlImage = '//localhost:3003/image/'
window.urlApi = '//localhost:3003/'


Vue.config.productionTip = false
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')    


