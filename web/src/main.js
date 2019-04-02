import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/toast'

window.urlImage = '//localhost:3003/image/'


Vue.config.productionTip = false
init() 
async function init () {
  try {    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')    
  } catch (error) {
    alert(error.response && error.response.statusText)
  }
}

