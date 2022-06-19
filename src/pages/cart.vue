<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:order>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head flex">
            <li class="col-1">
              <span
                class="checkbox"
                :class="{ checked: allChecked }"
                @click="toggleAll"
              >
              </span>
              全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li
              class="cart-item flex"
              v-for="item in list"
              :key="item.productId"
            >
              <div class="col-1">
                <span
                  class="checkbox"
                  :class="{ checked: item.productSelected }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name col-3">
                <img v-lazy="item.productMainImage" />
                <span>{{ item.productName + "," + item.productSubtitle }}</span>
              </div>
              <div class="item-price col-1">{{ item.productPrice }}</div>
              <div class="item-num col-2">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total col-1">{{ item.productTotalPrice }}</div>
              <div class="item-del col-1" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap cleafix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{ list.length }}</span
            >件商品，已选择<span>{{ checkedNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }} </span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import NavFooter from "@/components/NavFooter";
import ServiceBar from "@/components/ServiceBar.vue";
import { Message } from "element-ui";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
  },
  data() {
    return {
      list: [],
      checkedNum: 0,
      cartTotalPrice: 0,
      allChecked: false,
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    toggleAll() {
      let url = this.allChecked ? "/carts/unSelectAll" : "carts/selectAll";
      this.axios.put(url).then((res) => {
        this.renderData(res);
      });
    },
    order() {
      let isCheck = this.list.every((item) => !item.productSelected);
      if (isCheck) {
        Message.error("请选择一件商品");
      } else {
        this.$router.push("/order/confirm");
      }
    },
    // 获取购物车列表
    getCartList() {
      this.axios.get("/carts").then((res) => this.renderData(res));
    },
    updateCart(item, type) {
      let { quantity, productSelected: selected, productStock } = item;
      if (type === "-") {
        if (quantity == 1) {
          Message.error("商品至少保留一件");
          return;
        }
        --quantity;
      } else if (type === "+") {
        if (quantity > productStock) {
          Message.error("购买数量不能超过库存数量");
          return;
        }
        ++quantity;
      } else {
        selected = !selected;
      }

      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected,
        })
        .then((res) => {
          this.renderData(res);
        });
    },
    delProduct(item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        Message.success("删除成功");
        this.renderData(res);
      });
    },
    renderData(res) {
      const {
        cartProductVoList = [],
        selectedAll = false,
        cartTotalPrice = 0,
      } = res || {};
      this.list = cartProductVoList;
      this.allChecked = selectedAll;
      this.cartTotalPrice = cartTotalPrice;
      this.checkedNum = this.list.filter((item) => item.productSelected).length;
    },
  },
};
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: $colorG;
      font-size: $fontJ;
      color: $colorD;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid $colorH;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/public/imgs/icon-gou.png") $colorA no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        height: 79px;
        line-height: 79px;
      }
      .cart-item-list {
        .cart-item {
          align-items: center;
          height: 125px;
          border-top: 1px solid $colorH;
          font-size: $fontI;
        }
        .item-name {
          font-size: $fontH;
          color: $colorB;
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
          }
          span {
            margin-left: 30px;
          }
        }
        .item-price {
          color: $colorB;
        }
        .item-num {
          .num-box {
            display: inline-block;
            width: 150px;
            height: 40px;
            line-height: 40px;
            border: 1px solid $colorH;
            font-size: $fontJ;
            a {
              display: inline-block;
              width: 50px;
              color: $colorB;
            }
            span {
              display: inline-block;
              width: 50px;
              color: $colorB;
            }
          }
        }
        .item-total {
          color: $colorA;
        }
        .item-del {
          width: 14px;
          height: 12px;
          background: url("/public/imgs/icon-close.png") no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }
    }
    .order-wrap {
      font-size: $fontJ;
      color: $colorC;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: $colorC;
          margin-right: 37px;
        }
        span {
          color: $colorA;
          margin: 0 5px;
        }
      }
      .total {
        font-size: $fontJ;
        color: $colorA;
        span {
          font-size: $fontE;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: $fontH;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
