<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>
            购物车（{{ cartCount }}）
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a v-bind:href="'/product/' + item.id">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a v-bind:href="'/product/' + item.id">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-1.jpg`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-2.jpg`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-3.png`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-4.jpg`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-5.jpg`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img
                        :src="`${publicPath}imgs/nav-img/nav-3-6.png`"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米电视 ES65 2022款</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapState(["username", "cartCount"]),
  },
  filters: {
    currency(val) {
      if (!val) {
        return "0.00";
      }
      return "￥" + val.toFixed(2) + "元";
    },
  },
  mounted() {
    this.getProductList();
    // 此处做性能优化，如果从登录页跳转过来的就发起请求，否则不发，
    // app.vue 在刷新页面的时候会发起一次获取购物车数量的请求
    const { from = "" } = this.$route.params;
    if (from === "login") {
      this.getCartCount();
    }
  },
  methods: {
    ...mapActions(["saveUsername", "saveCartCount"]),
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6,
          },
        })
        .then((res) => {
          this.phoneList = res.list || [];
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        Message.success("退出成功");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.saveUsername({ username: "" });
        this.saveCartCount({ cartCount: 0 });
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
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background: $colorB;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        color: #b0b0b0;
        display: inline-block;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background: $colorA;
        text-align: center;
        margin-right: 0px;
        color: $colorG;
        .icon-cart {
          @include bgImg(16px, 12px, "/public/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      position: relative;
      @include flex();
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
      .header-menu {
        display: inline-block;
        padding-left: 209px;
        width: 643px;
        .item-menu {
          display: inline-block;
          color: $colorB;
          font-weight: bold;
          font-size: $fontI;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }

          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            background: $colorG;
            top: 112px;
            left: 0;
            width: 1226px;
            border-top: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            height: 0px;
            opacity: 0;
            overflow: hidden;
            transition: height 0.2s;

            .product {
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: $fontK;
              line-height: 12px;
              text-align: center;
              position: relative;
              &:before {
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
                content: "";
              }

              &:last-child:before {
                display: none;
              }
              a {
                display: inline-block;
              }
              img {
                height: 110px;
                width: auto;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
            }
          }
        }
      }

      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
            box-sizing: border-box;
          }
          a {
            @include bgImg(18px, 18px, "/public/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
