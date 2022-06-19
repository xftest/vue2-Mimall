<template>
  <div class="loading">
    <img
      src="/imgs/loading-svg/loading-bars.svg"
      alt="loading"
      :style="loadingStyle"
    />
  </div>
</template>
<script>
export default {
  name: "loading",
  props: ["loadingStyle"],
};
</script>

<style lang="scss">
.loading {
  height: 80px;
  line-height: 80px;
  text-align: center;
  padding: 30px 0;
  img {
    height: 100%;
  }
}
</style>
