import authStore from '../modules/User/store/index'

// check route khi gởi request, một số route không cần auth
const notAuthenticate = (to, from, next) => {
  let isAuthenticated = !!authStore.token
  if(!isAuthenticated) {
    next()
  }
  next()
}

const Authenticated = (to, from, next) => {
  let isAuthenticated = !!authStore.state.token
  if(isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

export default {
  notAuthenticate,
  Authenticated
}