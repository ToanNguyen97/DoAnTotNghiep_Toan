import axios from 'axios'

const getList = async (context) => {
  try {
    let data = await axios.get('http://localhost:3003/api/role-group')
    context.commit('getList', data)
  } catch (err) {
    return err
  }
}

export default {
  getList
}