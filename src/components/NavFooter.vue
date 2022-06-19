<template>
  <div class="footer">
    <div class="footer-logo">
      <img :src="`${publicPath}imgs/logo-footer.png`" alt="" />
      <p>小米商城</p>
    </div>

    <div class="footer-link">
      <a href="/index">主页</a>
      <a href="javascript:;">友情链接</a>
      <a href="javascript:;">友情链接</a>
      <a href="javascript:;">友情链接</a>
      <a href="javascript:;">友情链接</a>
    </div>
    <div class="copyright">
      京ICP备19036348号-2&nbsp;&nbsp;京公网安备 11010502045163号
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 234px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: $colorL;
  font-size: $fontI;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
    p {
    }
  }
  .footer-link {
    margin-bottom: 13px;
    a {
      position: relative;
      color: $colorL;
      margin-right: 8px;
      display: inline-block;
      padding-right: 8px;
      color: $colorA;

      &:before {
        position: absolute;
        right: 0;
        top: 7px;
        width: 1px;
        height: 10px;
        content: "";
        border-right: 1px solid $colorF;
      }

      &:last-child:before {
        border: none;
      }
    }
  }
}
</style>
