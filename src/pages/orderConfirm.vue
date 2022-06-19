<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:order>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"
          ></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"
          ></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"
          ></path>
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"
          ></path>
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"
          ></path>
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"
          ></path>
        </symbol>
      </defs>
    </svg>

    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <div class="addr-title">收货地址</div>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                :class="{ checked: index === checkIndex }"
                @click="checkIndex = index"
                v-for="(item, index) in list"
                :key="item.id"
              >
                <h2>{{ item.receiverName }}</h2>
                <div class="phone">{{ item.receiverMobile }}</div>
                <div class="street">
                  {{ item.receiverProvince }}&nbsp;
                  {{ item.receiverCity }}&nbsp;
                  {{ item.receiverDistrict }}&nbsp;
                  {{ item.receiverAddress }}
                </div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddr(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="editAddr(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="addAddr">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>

          <div class="item-good">
            <h2>商品</h2>
            <ul v-if="cartList.length > 0">
              <li class="flex" v-for="item in cartList" :key="item.productId">
                <div class="good-name col-5">
                  <img v-lazy="item.productMainImage" />
                  <span>
                    {{ item.productName + " " + item.productSubtitle }}
                  </span>
                </div>
                <div class="good-price col-2">
                  {{ item.productPrice || 0 }}元 x {{ item.quantity }}
                </div>
                <div class="good-total">{{ item.productTotalPrice }}元</div>
              </li>
            </ul>

            <no-data v-if="cartList.length === 0">
              <template v-slot:text>
                <p>
                  订单无商品，请前往<a href="/index" class="link">首页</a
                  >选择商品再来结算
                </p>
              </template>
            </no-data>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>

          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>

          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{ count }}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalPrice }}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalPrice }}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">
              去结算
            </a>
          </div>
        </div>
      </div>
    </div>

    <modal
      :title="title"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <el-form label-width="100px" size="mini">
            <div class="item">
              <el-form-item label="姓名">
                <input
                  type="text"
                  class="input"
                  placeholder="请输入姓名"
                  v-model="checkedItem.receiverName"
                />
              </el-form-item>
              <el-form-item label="手机号">
                <input
                  type="text"
                  class="input"
                  placeholder="请输入手机号"
                  maxlength="11"
                  v-model="checkedItem.receiverMobile"
                />
              </el-form-item>
            </div>

            <el-form-item label="订单地址">
              <v-distpicker
                class="item"
                :province="checkedItem.receiverProvince"
                :city="checkedItem.receiverCity"
                :area="checkedItem.receiverDistrict"
                @province="onChangeProvince"
                @city="onChangeCity"
                @area="onChangeArea"
                :placeholders="{
                  province: '请选择省',
                  city: '请选择市',
                  area: '请选择区',
                }"
              >
              </v-distpicker>
            </el-form-item>

            <div class="item">
              <el-form-item label="详细地址">
                <textarea
                  name="street"
                  placeholder="请输入详细地址"
                  v-model="checkedItem.receiverAddress"
                ></textarea>
              </el-form-item>
            </div>

            <div class="item">
              <el-form-item label="邮编">
                <input
                  type="text"
                  class="input"
                  placeholder="请输入邮编"
                  maxlength="6"
                  v-model="checkedItem.receiverZip"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </template>
    </modal>

    <modal
      title="删除地址"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import Modal from "@/components/Modal.vue";
import NoData from "@/components/NoData.vue";
import { Message, Form, FormItem } from "element-ui";
import VDistpicker from "v-distpicker";
import { USER_ACTION } from "@/util";

export default {
  name: "order-confirm",
  components: {
    Modal,
    OrderHeader,
    VDistpicker,
    NoData,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
  },
  data() {
    return {
      showModal: false,
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      checkedItem: {
        receiverProvince: "",
        receiverCity: "",
        receiverDistrict: "",
      }, //选中的商品对象
      userAction: "", //用户行为
      showDelModal: false, //是否显示删除弹框
      showEditModal: false, //是否显示新增或者编辑弹框
      checkIndex: 0, //当前收货地址选中索引
      title: "新增地址",
    };
  },
  mounted() {
    this.getAddressList();
    this.getCartsList();
  },
  methods: {
    onChangeProvince({ value }) {
      this.checkedItem.receiverProvince = value;
    },
    onChangeCity({ value }) {
      this.checkedItem.receiverCity = value;
    },
    onChangeArea({ value }) {
      this.checkedItem.receiverDistrict = value;
    },

    orderSubmit() {
      let item = this.list[this.checkIndex];
      if (!item) {
        Message.error("请选择一个收货地址");
        return;
      }

      this.axios
        .post("/orders", {
          shippingId: item.id,
        })
        .then((res) => {
          this.$router.push({
            path: "/order/pay",
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
    submitAddress() {
      const { userAction } = this;
      let method,
        url,
        params = {},
        resultMsg = "";

      switch (userAction) {
        case USER_ACTION.DELETE:
          method = "delete";
          url = `/shippings/${this.checkedItem.id}`;
          params = {};
          resultMsg = "删除地址成功";
          break;

        case USER_ACTION.EDIT:
          method = "put";
          url = `/shippings/${this.checkedItem.id}`;
          resultMsg = "修改地址成功";
          break;

        default:
          (method = "post"), (url = `/shippings`);
          resultMsg = "新增地址成功";
          break;
      }

      if (
        userAction === USER_ACTION.CREATE ||
        userAction === USER_ACTION.EDIT
      ) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        } = this.checkedItem;

        let errMsg = "";
        if (!receiverName) {
          errMsg = "请输入姓名";
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = "请输入正确格式的手机号";
        } else if (!receiverProvince) {
          errMsg = "请选择省份";
        } else if (!receiverCity) {
          errMsg = "请选择对应的城市";
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = "请输入收货地址";
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = "请输入6位邮编";
        }
        if (errMsg) {
          Message.error(errMsg);
          return;
        }

        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }

      this.axios[method](url, params).then(() => {
        Message.success(resultMsg);
        this.closeModal();
        this.getAddressList();
      });
    },

    closeModal() {
      this.checkedItem = {
        receiverProvince: "",
        receiverCity: "",
        receiverDistrict: "",
      };
      this.showDelModal = false;
      this.showEditModal = false;
      this.title = "";
      this.userAction = "";
    },
    getAddressList() {
      this.axios.get("/shippings").then((res) => {
        const { list } = res || {};
        this.list = list;
      });
    },
    getCartsList() {
      this.axios.get("/carts").then((res) => {
        const { cartProductVoList = [], cartTotalPrice = 0 } = res || {};
        this.cartList = cartProductVoList.filter(
          (item) => item.productSelected
        );
        this.cartTotalPrice = cartTotalPrice;
        this.cartList.map((item) => {
          this.count += item.quantity;
        });
      });
    },
    delAddr(item) {
      this.checkedItem = item;
      this.userAction = USER_ACTION.DELETE;
      this.showDelModal = true;
    },
    editAddr(item) {
      this.checkedItem = JSON.parse(JSON.stringify(item));
      this.userAction = USER_ACTION.EDIT;
      this.showEditModal = true;
      this.title = "编辑地址";
    },
    addAddr() {
      this.checkedItem = {
        receiverProvince: "",
        receiverCity: "",
        receiverDistrict: "",
      };
      this.userAction = USER_ACTION.CREATE;
      this.showEditModal = true;
      this.title = "创建地址";
    },
  },
};
</script>

<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: $colorG;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: $fontG;
        color: $colorB;
        font-weight: 200;
        margin-bottom: 21px;
      }

      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: $fontH;
              font-weight: 300;
              color: $colorB;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: $colorC;
                vertical-align: middle;
                &:hover {
                  fill: $colorA;
                }
              }
            }
            &.checked {
              border: 1px solid $colorA;
            }
          }
          .addr-add {
            text-align: center;
            color: $colorD;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/public/imgs/icon-add.png") #e0e0e0 no-repeat
                center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid $colorH;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: $fontJ;
            color: #757575;
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid $colorH;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid $colorH;
          padding-bottom: 5px;
        }
        li {
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: $fontI;
          color: $colorB;
          .good-name {
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-total {
            padding-right: 44px;
            color: $colorA;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: $fontG;
          width: 80px;
        }
        span,
        a {
          font-size: $fontI;
          color: $colorA;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid $colorJ;
        text-align: right;
        font-size: $fontI;
        color: $colorC;
        .item-val {
          color: $colorA;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: $fontC;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: $fontJ;
    .item {
      margin-bottom: 15px;
      justify-content: space-between;
      .input {
        display: inline-block;
        width: 400px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid $colorH;
        & + .input {
          margin-left: 14px;
        }
      }
      label {
        flex: 3;
        select {
          height: 40px;
          width: 130px;
          line-height: 40px;
          border: 1px solid $colorH;
          margin-right: 15px;

          &:is(:last-child) {
            margin-right: 0 !important;
          }
        }
      }

      textarea {
        height: 62px;
        width: 400px;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid $colorH;
      }
    }
  }
  .link {
    color: $colorM;
    margin: 0 6px;
  }
}
</style>
