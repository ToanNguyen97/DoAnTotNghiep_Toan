import moment from 'moment'
// đếm tổng số tiền của tháng trước
const countMoney = state => {
  let curentMonth = new Date()
  // nếu tháng hiện tại là 0 thì tháng trước là 12
  let getYear = curentMonth.getMonth() === 0?curentMonth.getFullYear()-1:curentMonth.getFullYear()
  let preMonth = new Date(`${curentMonth.getMonth() ===0?12:curentMonth.getMonth()}/${curentMonth.getDay()}/${getYear}`)
  let getMonth = moment(preMonth).format('MM/YYYY')
  let dsCTPT = state.dsPhieuThuTien.filter((item) => {
   let date = moment(new Date(item.ngayLap)).format('MM/YYYY')  
   return date === getMonth
  }).map(item => item.dsCTPT)
  let tongTien = 0
  for(let i of dsCTPT) {
    tongTien += i.reduce((total,item) => {
      if(item.soMoi) {
        return total += (item.soMoi - item.soCu) * item.donGia
      }
      else {
        return total += item.donGia
      }
    },0)
  }
  return {thang: `${curentMonth.getMonth()} năm ${getYear}`, tongTien: tongTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} 
}

export default {
  countMoney
}