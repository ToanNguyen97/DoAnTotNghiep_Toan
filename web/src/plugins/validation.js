const required = v => !!v || 'Không được để trống'
const email = v => /.+@.+/.test(v) || 'Không đúng định dạng mail'
const max20 = v =>  {
 return  (v && v.length <= 20) ||  ` tối đa 20 ký tự`
}
const max10 = v =>  {
 return  (v && v.length <= 10) ||  ` tối đa 10 ký tự`
}
const max13 = v =>  {
 return  (v && v.length <= 10) ||  ` tối đa 13 ký tự`
}
const max30 = v =>  {
 return  (v && v.length <= 30) ||  ` tối đa 30 ký tự`
}
const max40 = v =>  {
 return  (v && v.length <= 40) ||  ` tối đa 40 ký tự`
}


export default {
  required,
  email,
  max10,
  max20,
  max13,
  max30,
  max40
}