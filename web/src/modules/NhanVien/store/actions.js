'use strict'

import axios from 'axios'

const getNhanViens = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/nhanvien')
    context.commit('getListNhanVien', data)
  } catch (err) {
    return err
  }
}
const save =  async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/nhanvien', payload)
    context.commit('addNhanVien', data)
    return data
  } catch (err) {
    return err
  }
}
export default {
  getNhanViens,
  save
}