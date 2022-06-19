<template>
  <div class="nav-bar" :class="{ is_fixed: isFixed }">
    <div class="container">
      <div class="pro-title">{{ title }}</div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: ["title"],
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },

  methods: {
    initHeight() {
      // 滚动后距离顶部的距离
      // chrome 浏览器 document.documentElement.scrollTop
      // IE 浏览器 document.body.scrollTop
      // window.pageYOffset 右侧y轴滚动条偏移量 = document.documentElement.scrollTop
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.isFixed = scrollTop > 152 ? true : false;
    },
    // fibonacci(n) {
    //   if (n == 1 || n == 2) {
    //     return 1;
    //   }
    //   return this.fibonacci(n - 2) + this.fibonacci(n - 1);
    // },
  },
  // created() {
  //   let v = this.fibonacci(5);
  //   console.log(v);
  // },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, false);
  },
};
</script>

<style lang="scss">
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  // box-shadow：x轴、y轴、阴影的模糊值
  z-index: 10;

  &.is_fixed {
    position: fixed;
    top: 0;
    box-shadow: 0 5px 5px $colorH;
    width: 100%;
  }
  .container {
    @include flex();

    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }

    .pro-param {
      font-size: $fontJ;

      a {
        color: $colorC;
      }
      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
