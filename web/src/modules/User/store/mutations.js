const auth_request = state => state.status = 'loading'
const auth_success =  (state, data) => {
  state.token = data.token
  state.status = 'success'
  console.log(22222)
}
 const auth_error = state => state.status = 'error'

 export default {
   auth_request,
   auth_success,
   auth_error
 }

