import axios from 'axios'
import toast from '../../plugins/toast'
const ThongKe = async (payload) => {
  try {
    let {data} = await axios.post(`http:${window.urlApi}api/hopdong-thongke`, payload, {withCredentials: true})
    return data
  } catch (err) {
    toast.Error(err)
  }
}


export default {
  ThongKe
}