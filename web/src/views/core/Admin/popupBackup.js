import toast from '../../../plugins/toast.js'

export default {
  props:{
    value: {
      type: Boolean,
      default: false
    },
    restore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      namefolder: ""
    }
  },
  created() {
    
  },
  methods: {
    Huy () {
      this.namefolder = ""
      this.$emit("input",false)
    },
    getfolder() {
      let files = this.$refs['file'].files[0]
      let namePath = files.webkitRelativePath.split('/')
      this.namefolder = namePath[0]
    },
    chooseFile () {
      this.$refs['file'].click()
    },
    SaoLuu () {
      if(this.namefolder === "")
      {
        toast.Error('Vui lòng chọn thư mục')
      }
      else {
        if(this.restore === false) {
          this.$store.dispatch('auth/backup', this.namefolder).then(() => {
            toast.Success('Sao lưu thành công!')
            this.Huy()
          })
        }
        else if(this.restore === true) {
          this.$store.dispatch('auth/restore', this.namefolder).then(() => {
            toast.Success('Phục hồi thành công!')
            this.Huy()
          })
        }       
      }
    }
  },
}