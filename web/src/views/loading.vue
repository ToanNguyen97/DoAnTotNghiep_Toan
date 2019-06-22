<template>
<!-- <div class="loading-wrap">
  <div class="loading ">
    <span>loading...</span>
  </div>
</div> -->
  <v-img id="inspire"  style="height:100vh;" :src="require('@/assets/anhDep.gif')" >
  <v-progress-linear :indeterminate="true"></v-progress-linear>
    <div class="text-xs-center loading-box">
      <v-progress-circular
        :rotate="360"
        :size="70"
        :width="5"
        :value="value"
        color="teal"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="-90"
        :size="70"
        :width="5"
        :value="value"
        color="primary"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="90"
        :size="70"
        :width="5"
        :value="value"
        color="red"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="180"
        :size="70"
        :width="5"
        :value="value"
        color="pink"
      >
        {{ value }}
      </v-progress-circular>
    </div>
  </v-img>
</template>

<script>
export default {
  data() {
    return {
      change: false,
      interval: {},
      value: 0
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  created() {
    return setTimeout(() => {this.change = true}, 3000)
  },
  watch: {
    change () {
      if(this.change === true) {
        this.$router.push({name: 'TrangChu'})
      }
    }
  },
  methods: {
    
  },
   mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 290)
    }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.loading-wrap {
  background-color: orange;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  position: relative;
  animation: a1 2s linear infinite;
}

.loading::before, .loading::after {
  content: '';
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: -10px;
  box-sizing: border-box;
  border-radius: 50%;
}

.loading::before {
  border-top: 10px solid #f1c40f;
  transform: rotate(120deg);
}

.loading::after {
  border-top: 10px solid #2ecc71;
  transform: rotate(240deg);
}
.loading-box {
  position:  absolute;
  bottom: 0;
  left: 34%;
}


.loading span {
  position: absolute;
  width: 200px;
  left: 0;
  height: 200px;
  color: #fff;
  text-align: center;
  line-height: 200px;
  animation: a2 2s linear infinite;
}
 @keyframes a1 {
  to {
    transform: rotate(360deg);
  }
}
@keyframes a2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>