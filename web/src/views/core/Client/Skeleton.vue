<template>
  <span
    :style="{ height, width: computedWidth }"
    class="SkeletonBox"
  />
</template>

<script>
export default {
  name: 'SkeletonBox',
  props: {
    maxWidth: {
      // The default maxiumum width is 100%.
      default: 100,
      type: Number,
    },
    minWidth: {
      // Lines have a minimum width of 80%.
      default: 80,
      type: Number,
    },
    height: {
      // Make lines the same height as text.
      default: '500',
      type: String,
    },
    width: {
      // Make it possible to define a fixed
      // width instead of using a random one.
      default: null,
      type: String,
    },
  },
  computed: {
    computedWidth() {
      // Either use the given fixed width or
      // a random width between the given min
      // and max values.
      return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`;
    },
  },
};
</script>

<style >
 .SkeletonBox {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    background-color: #DDDBDD;
 }
 .SkeletonBox::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: -webkit-gradient(
      linear, left top, right top,
       color-stop(0, hsla(0, 0%, 100%, 0)),
        color-stop(20%, hsla(0, 0%, 100%, .2)),
         color-stop(60%, hsla(0, 0%, 100%, .8)),
          to(hsla(0, 0%, 100%, 0)));
    animation: shimmer 2.5s infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

 </style>