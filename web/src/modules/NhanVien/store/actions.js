'use strict'

import axios from 'axios'

const getNhanViens = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/nhanvien')   
    if(data.message !== 'Not allowed') {
      context.commit('getListNhanVien', data)
      return true
    }else {
      return false
    }
  } catch (err) {
    return err
  }
}

const deleteNhanVien = async ({commit}, idXoa) => {
  try {
  let {data} = await axios.delete(`http://localhost:3003/api/nhanvien-delete-${idXoa}`)
  commit('removeNhanVien', data)
  return data
  } catch (err) {
    return false
  }
}
const save =  async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/nhanvien', payload)
    if(data.message !== 'Not allowed') {
      context.commit('addNhanVien', data)
      return data
    }else {
      return false
    } 
  } catch (err) {
    return err
  }
}
export default {
  getNhanViens,
  save,
  deleteNhanVien
}