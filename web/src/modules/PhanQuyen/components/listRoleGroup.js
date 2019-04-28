export default {
  data() {
    return {
      pagination:{},
      headers: [
      ],
      loading: false
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('phanquyen/getList').then(() => {
      this.loading = false
    })
  },
  computed: {
    dsRoleGroup () {
      return this.$store.state.phanquyen.dsRoleGroup
    }
  },
}