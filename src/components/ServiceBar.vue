<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "service-bar",
};
</script>

<style lang="scss">
.service {
  padding: 33px 0;
  color: $colorC;
  font-size: $fontI;
  text-align: center;

  li {
    display: inline-block;
    width: 24.8%;
    text-align: center;
    border-right: 1px solid $colorH;

    &:last-child {
      border-right: none;
    }
    span {
      vertical-align: middle;
      margin-right: 8px;
    }

    .icon-setting {
      @include bgImg(20px, 20px, "/public/imgs/icon-setting.png");
    }
    .icon-7day {
      @include bgImg(20px, 20px, "/public/imgs/icon-7day.png");
    }
    .icon-15day {
      @include bgImg(20px, 20px, "/public/imgs/icon-15day.png");
    }
    .icon-post {
      @include bgImg(20px, 20px, "/public/imgs/icon-post.png");
    }
  }
}
</style>
