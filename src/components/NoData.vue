<template>
  <div class="no-data">
    <img src="/imgs/icon-no-data.png" alt="无数据" />
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: "no-data",
};
</script>

<style lang="scss">
.no-data {
  text-align: center;
  font-size: $fontG;
  color: $colorD;
  margin: 50px 0;

  img {
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
}
</style>
