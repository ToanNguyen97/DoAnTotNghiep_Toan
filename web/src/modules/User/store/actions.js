import axios from 'axios'

const login = async ({commit}, user) => {
  try {
    // bắt đầu xác thực đăng nhập commit để đối status
    commit('auth_request')
    let {data} = await axios.post('http://localhost:3003/api/login', user)
   // axios.post('http://localhost:3003/api/login', user).then( res => console.log('res',res))
    // nếu có data và auth = true thì set token
    if(data.auth) {
      const token = data.token
      localStorage.setItem('token', token)
      document.cookie = `token=${token}`
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', data)
    }
    else {
      commit('auth_error', data)
    }
    return data
  } catch (err) {
    return err
  }
}

const logout = async ({commit}) => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
  commit('auth_logout')
}

const getUser = async ({commit}) => {
  if(localStorage.getItem('token') && localStorage.getItem('token').length > 2)
  {
    let {data} = await axios.get('http://localhost:3003/api/get-current-user')
    commit('setUser', data)
    return data
  }
}

const setUserInfo = async ({commit}, data) => {
  commit('setUserInfo', data)
}

const editUser = async({commit}, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/editUser',payload)
    if(data.user && data.isPassword === true) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      commit('auth_logout')
    }
    return data
  } catch (err) {
    return err
  }
}


const backup = async (context,namefolder) => {
  let {data} = await axios.post('http://localhost:3003/api/backup',{namefolder})
  return data
}

const restore = async (context, namefolder) => {
  let {data} = await axios.post('http://localhost:3003/api/restore',{namefolder})
  return data
}
export default {
  login,
  logout,
  getUser,
  editUser,
  backup,
  restore,
  setUserInfo
}