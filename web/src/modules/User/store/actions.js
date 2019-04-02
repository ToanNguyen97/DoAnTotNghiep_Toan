import axios from 'axios'

const login = async ({commit}, user) => {
  try {
    // bắt đầu xác thực đăng nhập commit để đối status
    commit('auth_request')
    let {data} = await axios.post('http://localhost:3003/api/login', user)
    // nếu có data và auth = true thì set token
    if(data.auth) {
      const token = data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', data)
    }
    else {
      commit('auth_error', data)
    }
    console.log(111111111111)
    return data
  } catch (err) {
    return err
  }
}

const logout = async () => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
  return true
}

export default {
  login,
  logout
}