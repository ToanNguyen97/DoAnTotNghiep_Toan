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
  let optionsI = {
    theme: "outline",
    position: 'top-center',
    duration: 5000,
    icon: {
      name: 'check_circle',
      after: false
    },
    className: 'colorText'
  }
  Vue.toasted.info(message,optionsI)
}
const Error = (message) => {
  
  let optionsE = {
    theme: "outline",
    position: 'top-center',
    duration: 5000,
    icon: {
      name: 'clear',
      after: false
    },
    className: 'colorText'
  }
  Vue.toasted.error(message,optionsE)
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