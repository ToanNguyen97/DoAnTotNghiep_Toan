import popupBackup from './popupBackup.vue'
export default {
  components:{
    popupBackup
  },
  props: {
    permission: {
      type:Object
    },
    User: Object,
    mini: {
      type: Boolean      
    },
    check: {
      type: Boolean
    }
  },
  data () {
    return {
      itemsTK: [
        { title: 'Thống kê hợp đồng', icon: 'account_balance', link: '/thong-ke-hop-dong.html' },
        { title: 'Thống kê khách thuê', icon: 'people_outline', link: '/thong-ke-phieu-thu1.html' },
        { title: 'Thống kê phiếu thu', icon: 'monetization_on', link: '/thong-ke-phieu-thu2.html' },
        { title: 'Thống kê phiếu trả phòng', icon: 'signal_cellular_no_sim', link: '/thong-ke-phieu-thu3.html' },
      ],
      drawer: true,
      isOpenMini: true,
      right: null,
      open: false,
      isRestore: false
    }
  },  
  watch: {
    mini () {
      if (this.mini) {
        this.isOpenMini = true
      }else
      {
        this.isOpenMini = false
      }    
    },
    isOpenMini (v) {
      this.$emit('input', v)
    }
  },

  methods: {
    openBackup () {
      this.open = true
      this.isRestore = false
    },
    openRestore () {
      this.open = true,
      this.isRestore = true
    },
    showDashboard () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc560d021fd1c0d185cbd81'))
      {
        return true
      }
      return false
    },
    showRoom () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc57a84f34b6716fc4a82cb'))
      {
        return true
      }
      return false
    },
    showBooking () {
      if(this.permission && this.permission.roles.some(item => item._id === '5ce2a46ada8c8860dc9308a4'))
      {
        return true
      }
      return false
    },
    showCustomer () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc560ee21fd1c0d185cbd82'))
      {
        return true
      }
      return false
    },
    showContract () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc5795cf34b6716fc4a82c9'))
      {
        return true
      }
      return false
    },
    showBill () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc560f421fd1c0d185cbd83'))
      {
        return true
      }
      return false
    },
    showStatistical () {
      if(this.permission &&  this.permission.roles.some(item => item._id === '5cc5621b130408431020fce2'))
      {
        return true
      }
      return false
    },
    showSetUp () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc57b1cf34b6716fc4a82cc'))
      {
        return true
      }
      return false
    },
    showLayoutKhach () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc57b81f34b6716fc4a82cd'))
      {
        return true
      }
      return false
    },
    showNhanVien () {
      if(this.permission && this.permission.roles.some(item => item._id === '5cc57a16f34b6716fc4a82ca'))
      {
        return true
      }
      return false
    }
  }
}