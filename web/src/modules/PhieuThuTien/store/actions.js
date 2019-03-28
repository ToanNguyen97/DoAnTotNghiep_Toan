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
    let {data} = await axios.post('http://localhost:3003/api/phieuthutien', payload)
    context.commit('addPhieuThuTien', data)
    return data
  } catch (err) {
    return err
  }
}

const thanhToan = async (context, payload) => {
  let {data} = await axios.post('http://localhost:3003/api/phieuthutien', payload)
  context.commit('updatePhieuThu', data)
  return data
}

const sendMail = async (context, idPT) => {
  return  await axios.get(`http://localhost:3003/api/sendmailphieuthutien/${idPT}`)
}

export default {
  getPhieuThuTiens,
  addPhieuThuTien,
  thanhToan,
  sendMail
}