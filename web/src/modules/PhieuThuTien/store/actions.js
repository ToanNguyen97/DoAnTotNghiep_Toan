import axios from 'axios'

const getPhieuThuTiens = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/phieuthutien')
    context.commit('getListPhieuThuTien', data)
  } catch (err) {
    return err
  }
}

const addPhieuThuTien = async (context, payload) => {
  try {
    console.log('payload',payload)
    let {data} = await axios.post('http://localhost:3003/api/phieuthutien', payload)
    context.commit('addPhieuThuTien', data)
    return data
  } catch (err) {
    return err
  }
}

export default {
  getPhieuThuTiens,
  addPhieuThuTien
}