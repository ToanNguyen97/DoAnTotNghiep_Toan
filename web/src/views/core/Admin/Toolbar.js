import NavigationDrawer from '@/views/core/Admin/NavigationDrawer.vue'

export default {
  components: {
    NavigationDrawer
  },
  data () {
    return {
      user: {},
      fav: true,
      menu: false,
      hints: true,
      mini: true,
      check: true,
      icon: 'format_list_bulleted',
      items: [
        {name: 'About me', icon: 'people', path: '/about'},
        {name: 'Cập nhật', icon: 'edit', path: '/login'},
      ]
    }
  },
  created() {
    this.$store.dispatch('auth/getUser').then( res => this.user = res)
  },
  methods: {
    input (data) {
      this.$emit('input', data)
    },
    goToInfo () {
      this.$router.push({name: 'Login'})
    },
    changeMini () {
      this.mini = !this.mini
      if(this.mini == false)
      {
        this.icon = 'format_align_center'
        this.check = false
      }
      else
      {
        this.icon = 'format_list_bulleted'
        this.check = true
      }
    },
    LogOut () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({path:'/login'})
      })
    }
  }
}