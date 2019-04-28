import authStore from '../modules/User/store/index'
import store from '../store.js'
// check route khi gởi request, một số route không cần auth
const notAuthenticate = (to, from, next) => {
  let isAuthenticated = !!authStore.token
  if(!isAuthenticated) {
    next()
  }
  next()
}

const Authenticated = async (to, from, next) => {
  let isAuthenticated = !!authStore.state.token
  if(isAuthenticated) {
    /*
    1: mình sẽ lấy thông tin user từ vuex
    2: nhưng crt f5 thì thông tin user mất nên phải call api
     */
    let user = store.get('auth/user')
    if(!user.roles) {
      await store.dispatch('auth/getUser').then (res => {
        user = res
      })
    }
    if(user.rolesGroupID.roles.some(item => String(item._id) === String(to.meta.role))) {
      next()
    } else {
      next('/404.html')
    }
  } else {
    next('/login')
  }
}

const isRoles = (to, from, next) => {
  let user = store.get('auth/user')
  // hàm some giúp duyệt qua mảng và nếu có 1 phần tử giống với giá trị truyền vào => true
  if(to.meta.roles.some(item => item === user.roles )) {
    next()
  } else {
    next('/404.html')
  }
}

export default {
  notAuthenticate,
  Authenticated,
  isRoles
}