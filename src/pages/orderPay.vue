<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:order>
        <span>请谨防钓鱼链接或诈骗电话，了解更多> </span>
      </template>
    </order-header>

    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情<em
                  class="icon-down"
                  :class="{ up: showDetail }"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderNo }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{ addressInfo }}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="item in orderDetail" :key="item.id">
                    <img v-lazy="item.productImage" />
                    {{ item.productName }} x {{ item.quantity }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali"
              :class="{ checked: isAliPayChecked }"
              @click="paySubmit(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: !isAliPayChecked }"
              @click="paySubmit(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code
      v-if="showPay"
      @close="closePayModal"
      :img="payImg"
    ></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancleText="未支付"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import ScanPayCode from "@/components/ScanPayCode.vue";
import Modal from "@/components/Modal.vue";
import QRCode from "qrcode";
import { PAY_TYPE, PAY_STATUS } from "@/util";
import { Message } from "element-ui";
export default {
  name: "order-pay",
  components: { OrderHeader, ScanPayCode, Modal },
  data() {
    return {
      payment: 0,
      showDetail: false,
      payType: PAY_TYPE.ALIPAY,
      orderNo: this.$route.query.orderNo,
      addressInfo: "", //收货人地址
      productName: "",
      orderDetail: [], //订单详情
      showPay: false,
      payImg: "",
      showPayModal: false,
      T: "", //定时器ID
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  computed: {
    isAliPayChecked() {
      return this.payType === PAY_TYPE.ALIPAY;
    },
  },
  methods: {
    // 轮询 查看支付状态,定时器
    loopOrderStatus() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          const { status } = res || {};
          if (status == PAY_STATUS.SUCCESS) {
            clearInterval(this.T);
            this.showPayModal = false;
            this.goOrderList();
          }
        });
      }, 2000);
    },
    goOrderList() {
      this.$router.push("/order/list");
    },
    paySubmit(payType) {
      this.payType = payType;
      if (this.payType === PAY_TYPE.ALIPAY) {
        window.open("/order/alipay?orderId=" + this.orderNo, "_blank");
      }

      if (this.payType === PAY_TYPE.WX) {
        this.axios
          .post("/pay", {
            orderId: this.orderNo,
            orderName: "此订单不支持退款，谨慎购买",
            amount: 0.01,
            payType: PAY_TYPE.WX,
          })
          .then((res) => {
            const { content = "" } = res || {};
            QRCode.toDataURL(content, (err, url) => {
              if (err) {
                Message.error("微信二维码生成失败，请稍后重试！");
                return;
              }
              this.payImg = url;
              this.showPay = true;
              this.loopOrderStatus();
            });
          });
      }
    },
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      this.payImg = "";
      clearInterval(this.T);
    },
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        const { shippingVo = {}, orderItemVoList, payment } = res || {};
        const {
          receiverName,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverMobile,
          receiverZip,
        } = shippingVo;
        this.addressInfo = `${receiverName} ${receiverMobile}
        ${receiverProvince}/${receiverCity}/${receiverDistrict}/${receiverAddress} ${receiverZip}
        `;

        // let productNameArr = [];
        // orderItemVoList.map((item) => {
        //   productNameArr.push(`${item.productName} x ${item.quantity}`);
        // });
        // this.productName = productNameArr.join(",");
        this.orderDetail = orderItemVoList;
        this.payment = payment;
      });
    },

    isAlipay() {
      return this.payType === PAY_TYPE.ALIPAY;
    },
  },
};
</script>

<style lang="scss">
.order-pay {
  .wrapper {
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: $colorG;
      font-size: $fontJ;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url("/public/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: $fontE;
            color: $colorB;
            margin-bottom: 20px;
          }
          p {
            color: $colorC;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: $fontC;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url("/public/imgs/icon-down.png") no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid $colorF;
        padding-top: 47px;
        padding-left: 130px;
        font-size: $fontJ;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: $colorG;
      color: $colorB;
      h3 {
        font-size: $fontG;
        font-weight: 200;
        color: $colorB;
        padding-bottom: 24px;
        border-bottom: 1px solid $colorF;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: $fontH;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid $colorF;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url("/public/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url("/public/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
