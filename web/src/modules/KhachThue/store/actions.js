'use strict'

import axios from 'axios'

const getKhachs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/khachthue')
    context.commit('getListKhachThue', data)
  } catch (err) {
    return err
  }
}

const getLoaiKhachs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/loaikhachthue')
    context.commit('getListLoaiKhachThue', data)
  } catch (err) {
    return err
  }
}

const getKhachBySDT = async (context, sdt) => {
  try {
    let {data} = await axios.get(`http://localhost:3003/api/khachthue/sdt=${sdt}`)
    return data
  } catch (err) {
    return err
  }
}
const save =  async (context, payload) => {
  try {
    console.log('data', payload)
    let {data} = await axios.post('http://localhost:3003/api/khachthue', payload)
    context.commit('addKhachThue', data)
    return data
  } catch (err) {
    return err
  }
}

const deleteKhachThue = async (context, idxoa) => {
  try {
    let {data} = await axios.delete('http://localhost:3003/api/khachthue/' + idxoa)
    context.commit('deleteKhachThue', data)
    return data
  } catch (err) {
    return err
  }
}

const deleteMultiKhachThue = async (context, idMulti) => {
  try {
    console.log(idMulti)
    for(let item of idMulti) {
      await axios.delete('http://localhost:3003/api/khachthue/' + item)
    }
    context.commit('deleteMultiKhachThue', idMulti)
  } catch (err) {
    return err
  }
}

const timKiemKhachThue = async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/khachthuetimkiem/chinhxac='+ payload.isReal, payload.formData)
    context.commit('getListKhachThue', data)
    return data
  } catch (err) {
    return err
  }
}

const traPhong = async (context, payload)=> {
  try {
    console.log(payload)
    let {data} = await axios.put('http://localhost:3003/api/khachthue/'+ payload._id, payload)
    return data
  } catch (err) {
    return err
  }
}
export default {
  getKhachs,
  getLoaiKhachs,
  save,
  deleteKhachThue,
  deleteMultiKhachThue,
  timKiemKhachThue,
  getKhachBySDT,
  traPhong
}