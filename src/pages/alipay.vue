<template>
  <div class="alipay">
    <order-header title="订单支付">
      <template v-slot:order>
        <span>请谨防钓鱼链接或诈骗电话，了解更多> </span>
      </template>
    </order-header>
    <loading v-if="loading" :style="{ margin: '80px' }"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import OrderHeader from "@/components/OrderHeader";
import { PAY_TYPE } from "@/util";
export default {
  name: "alipay",
  components: { Loading, OrderHeader },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "",
      loading: true,
    };
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "此订单不支持退款，谨慎购买",
          amount: 0.01,
          payType: PAY_TYPE.ALIPAY,
        })
        .then((res) => {
          const { content = "" } = res || {};
          this.content = content;
          this.loading = false;
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        });
    },
  },
};
</script>

<style lang="scss">
.alipay {
}
</style>
