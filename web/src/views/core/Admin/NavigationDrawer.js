import popupBackup from './popupBackup.vue'
export default {
  components:{
    popupBackup
  },
  props: {
    permission:"",
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
    goToItem (path) {
      this.$router.push({path: path})
    },
    showDashboard () {
      if(this.permission && this.permission === "chủ trọ")
      {
        return true
      }
      return false
    },
    showRoom () {
      if((this.permission && this.permission === "chủ trọ") || (this.permission && this.permission === "nhân viên"))
      {
        return true
      }
      return false
    },
    showCustomer () {
      if((this.permission && this.permission === "chủ trọ") || (this.permission && this.permission === "nhân viên"))
      {
        return true
      }
      return false
    },
    showContract () {
      if((this.permission && this.permission === "chủ trọ") || (this.permission && this.permission === "nhân viên"))
      {
        return true
      }
      return false
    },
    showBill () {
      if((this.permission && this.permission === "chủ trọ") || (this.permission && this.permission === "nhân viên"))
      {
        return true
      }
      return false
    },
    showStatistical () {
      if(this.permission && this.permission === "chủ trọ")
      {
        return true
      }
      return false
    },
    showSetUp () {
      if(this.permission && this.permission === "chủ trọ")
      {
        return true
      }
      return false
    },
    showLayoutKhach () {
      if(this.permission && this.permission === "khách thuê")
      {
        return true
      }
      return false
    },
    showNhanVien () {
      if(this.permission && this.permission === "chủ trọ")
      {
        return true
      }
      return false
    }
  }
}