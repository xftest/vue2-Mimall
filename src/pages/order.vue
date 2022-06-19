<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar.vue";
import NavFooter from "@/components/NavFooter";
export default {
  name: "order",
  components: {
    NavFooter,
    ServiceBar,
  },
};
</script>
