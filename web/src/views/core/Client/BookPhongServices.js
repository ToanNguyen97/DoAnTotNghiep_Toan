import axios from 'axios'

const bookPhong = async (payload) => {
  try {
    let {data} = await axios.post(`${window.urlApi}api/book-phong`,payload)
    return data
  } catch (err) {
    return err
  }
}

export default {
  bookPhong
}