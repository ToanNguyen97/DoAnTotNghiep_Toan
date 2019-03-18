import Vue from 'vue'
import toasted from 'vue-toasted'

Vue.use(toasted)

const options = {
  theme: "outline",
  position: 'top-center',
  duration: 2000,
  icon: {
    name: 'check_circle',
    after: false
  },
  className: 'colorText'
}

const Success = (message) => {
  Vue.toasted.success(message,options)
}
const Info = (message) => {
  Vue.toasted.info(message,options)
}
const Error = (message) => {
  Vue.toasted.error(message,options)
}
const Show = (message) => {
  Vue.toasted.show(message,options)
}

export default {
  Success,
  Info,
  Error,
  Show
}