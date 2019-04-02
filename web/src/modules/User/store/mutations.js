const auth_request = state => state.status = 'loading'
const auth_success =  (state, data) => {
  state.token = data.token
  state.status = 'success'
  state.user = data.credentials
}
const auth_logout = state => {
  state.token = '',
  state.status = '',
  state.user = {}
}

const setUser = (state, data) => {
  state.user = data,
  state.status = "success"
}
const auth_error = state => state.status = 'error'
export default {
   auth_request,
   auth_success,
   auth_logout,
   auth_error,
   setUser
 }

