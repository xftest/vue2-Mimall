<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      res: {},
    };
  },
  mounted() {
    const getCookie = this.$cookie.get("userId");
    if (getCookie) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    ...mapActions(["saveUsername", "saveCartCount"]),
    getUser() {
      this.axios.get("/user").then((res) => {
        const { username } = res || {};
        this.saveUsername({ username });
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res) => {
        this.saveCartCount({ cartCount: res || 0 });
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/button.scss";
</style>
