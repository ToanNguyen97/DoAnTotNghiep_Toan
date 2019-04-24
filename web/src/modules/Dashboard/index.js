import Dashboard from './components/dashboard.vue'

export default [
  {
    path:'/tong-quan.html',
    name:'dashboard',
    component: Dashboard,
    meta: { roles: ['chủ trọ']},
  }
]