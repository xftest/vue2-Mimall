<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/index"></a>
      </div>

      <div class="title fl">
        <h2>
          {{ title }}
          <slot name="order"></slot>
        </h2>
      </div>

      <div class="username fr">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "order-header",
  props: ["title"],
  computed: {
    ...mapState(["username"]),
  },
};
</script>

<style lang="scss">
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid $colorA;
  .header-logo {
    display: inline-block;
    width: 55px;
    height: 55px;
    background: $colorA;
    a {
      display: inline-block;
      width: 110px;
      height: 55px;

      &:before {
        content: "";
        @include bgImg(55px, 55px, "/public/imgs/mi-logo.png", 55px);
        transition: margin 0.2s;
      }
      &:after {
        content: "";
        @include bgImg(55px, 55px, "/public/imgs/mi-home.png", 55px);
      }
      &:hover:before {
        margin-left: -55px;
        transition: margin 0.2s;
      }
    }
  }

  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }

  .title {
    margin-left: 54px;
    h2 {
      font-size: $fontC;
      color: $colorB;
    }
    span {
      font-size: $fontJ;
      margin-left: 17px;
      color: $colorD;
      font-weight: 200;
    }
  }
  .username {
    a {
      color: $colorC;
      font-size: $fontI;
    }
  }
}
</style>
