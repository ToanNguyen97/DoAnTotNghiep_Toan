import moment from 'moment'
// đếm tổng số tiền của tháng trước
const countMoney = state => {
  let curentMonth = new Date()
  // nếu tháng hiện tại là 0 thì tháng trước là 12
  let getYear = curentMonth.getMonth() === 0?curentMonth.getFullYear()-1:curentMonth.getFullYear()
  let preMonth = new Date(`${curentMonth.getMonth() ===0?12:curentMonth.getMonth()}/${curentMonth.getDate()}/${getYear}`)
  let getMonth = moment(preMonth).format('MM/YYYY')
  let dsCTPT = state.dsPhieuThuTien.filter((item) => {
   let date = moment(new Date(item.ngayLap)).format('MM/YYYY')  
   return date === getMonth
  }).map(item => item.dsCTPT)
  let tongTien = 0
  if(dsCTPT && dsCTPT.length > 0) {
    for(let i of dsCTPT) {
      if(i && i.length > 0 ) {
        tongTien += i.reduce((total,item) => {
          if(item.soMoi) {
            return total += (item.soMoi - item.soCu) * item.donGia
          }
          else {
            return total += item.donGia
          }
        },0)
      }
    }
    return {thang: `${curentMonth.getMonth()} năm ${getYear}`, tongTien: tongTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} 
  } else {
    return {thang: `${curentMonth.getMonth()} năm ${getYear}`, tongTien: 0} 
  }
 
}

// đếm tỉ lệ tình trạng phiếu thu của tháng trước
const countPercentTinhTrang = state => {
  let curentMonth = new Date()
  // nếu tháng hiện tại là 0 thì tháng trước là 12 và năm là của năm trước
  let getYear = curentMonth.getMonth() === 0?curentMonth.getFullYear()-1:curentMonth.getFullYear()
  let preMonth = new Date(`${curentMonth.getMonth() ===0?12:curentMonth.getMonth()}/${curentMonth.getDate()}/${getYear}`)
  let getMonth = moment(preMonth).format('MM/YYYY')
  // lấy ra danh sách phiếu thu có tháng và năm bằng vs tháng và năm tháng trước
  let dsPT = state.dsPhieuThuTien.filter((item) => {
   let date = moment(new Date(item.ngayLap)).format('MM/YYYY')  
   return date === getMonth
  })
  // tính tỉ lệ % của tình trạng phiếu thu
  if(dsPT && dsPT.length > 0) {
    let tongPT = dsPT.length
    let quaHan = 0;
    let daDong = 0;
    let chuaDong = 0;
    for (let item of dsPT) {
      if(item.tinhTrangPhieuThu === 'quá hạn') {
        quaHan += 1
      } else if (item.tinhTrangPhieuThu === 'chưa đóng') {
        chuaDong += 1
      } else {
        daDong += 1
      }
    }
    quaHan = (quaHan * 100)/tongPT
    daDong = (daDong * 100)/tongPT
    chuaDong = (chuaDong * 100)/tongPT   
    return {thang: `${curentMonth.getMonth()} năm ${getYear}`, series: [chuaDong, daDong, quaHan]}
  } else {
    return {thang: `${curentMonth.getMonth()} năm ${getYear}`, series: [0, 0, 0]}
  }
}

// đếm tổng tiền của năm nay
const countDoanhThuNam = state => {
  // lọc ra danh sách phiếu thu của năm 
  let currentYear = new Date().getFullYear()
  let phieuThuNam  = state.dsPhieuThuTien.filter(item => {
   let year = moment(item.ngayLap).format('YYYY')
    return year == currentYear
  })
  
  return phieuThuNam
}
export default {
  countMoney,
  countPercentTinhTrang,
  countDoanhThuNam
}