import axios from 'axios'

const setKhach = async ({commit},data) => {
  commit('setKhach',data)
}

const getDetailKhach = async ({commit}, idKhach) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/khachthue/id='+ idKhach)
    commit('getDetailKhach', data.khachThue)
    commit('getPhongOfKhach', data.phong)
    return data
  } catch (err) {
    return err
  }
}

const thanhtoan = async (context, phieuthuInfo) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/phieuthutien-thanhtoan', {phieuthuInfo})
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}

export default {
  getDetailKhach,
  setKhach,
  thanhtoan
}