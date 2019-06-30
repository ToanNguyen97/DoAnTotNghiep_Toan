import axios from 'axios'

const save = async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/phieutraphong', payload)
    context.commit('addPhieuTraPhong', data)
    return data
  } catch (err) {
    return err
  }
}

const getAllPhieuTraPhong = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/phieutraphong')
    context.commit('listPhieuTraPhong', data)
  } catch (err) {
    return err
  }
}

const getByPhongId = async (context, id) => {
  let {data} = await axios.get('http://localhost:3003/api/phieutraphongbyphong/'+id)
  context.commit('listPhieuTraPhong', data)
}

export default {
  save,
  getAllPhieuTraPhong,
  getByPhongId
}