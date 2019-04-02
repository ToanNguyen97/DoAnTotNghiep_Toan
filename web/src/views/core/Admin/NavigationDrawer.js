export default {
  props: {
    permission:Array,
    mini: {
      type: Boolean      
    },
    check: {
      type: Boolean
    }
  },
  data () {
    return {
      menus: [
        {
          action: 'insert_chart_outlined',
          title: 'Biểu Đồ',
          active: true,
          link: '/danh-sach-phong.html'
        },
        {
          action: 'account_balance',
          title: 'Phòng Trọ',
          link: '/danh-sach-phong.html'
        },
        {
          action: 'people_outline',
          title: 'Khách Thuê',
          link: '/danh-sach-khach-thue.html'
        },
        {
          action: 'event_note',
          title: 'Hợp Đồng',
          link: '/danh-sach-hop-dong-thue-phong.html'
        },
        {
          action: 'monetization_on',
          title: 'Phiếu Thu Tiền',
          link:'/phieu-thu-tien-phong.html'           
        },
        {
          action: 'add_to_queue',
          title: 'Thống Kê',
          items: [
            { title: 'Thống kê phòng', icon: 'account_balance' },
            { title: 'Thống kê khách thuê', icon: 'people_outline' },
            { title: 'Thống kê phiếu thu', icon: 'monetization_on' },
            { title: 'Thống kê phiếu trả phòng', icon: 'signal_cellular_no_sim' },
          ]
        },
        {
          action: 'settings',
          title: 'Cấu hình',
          items: [
            { title: 'Sao lưu', icon: 'settings_power', color:'yellow' },
            { title: 'Phục hồi', icon: 'settings_backup_restore' }
          ]
        }],   
      drawer: true,
      isOpenMini: true,
      right: null
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
    goToItem (path) {
      this.$router.push({path: path})
    },
    showDashboard () {
      if(this.permission && this.permission.includes('super-admin'))
      {
        return true
      }
      return false
    }
  }
}