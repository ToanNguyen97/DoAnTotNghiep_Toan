'use strict'

import axios from 'axios'

const save = async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/hopdongthuephong', payload)
    context.commit('addOrUpadteHopDong', data)
    return data
  } catch (err) {
    return err
  }
}

const getListHopDongThuePhong = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/hopdongthuephong')
    context.commit('getListHopDongThuePhong', data)
  } catch (err) {
    return err
  }
}

export default {
  getListHopDongThuePhong,
  save
}