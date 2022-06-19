<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="item in menuList" :key="item.name">
              <a href="javascript:;">{{ item.name }}</a>
              <div class="children">
                <ul v-for="lists in item.list" :key="lists.id">
                  <li v-for="sub in lists" :key="sub.id">
                    <a :href="sub.id ? '/product/' + sub.id : 'javascript:;'">
                      <img :src="sub.img || '/imgs/item-box-1.png'" />
                      {{ sub.name || "小米9" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <swiper :options="swiperOption">
          <swiper-slide v-for="item in sliderList" :key="item.id">
            <a :href="'/product/' + item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/product/' + item.id" v-for="item in adsList" :key="item.id">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="/product/30">
          <img v-lazy="`${publicPath}imgs/banner-1.png`" />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/product/35">
              <img v-lazy="`${publicPath}imgs/mix-alpha.jpg`" />
            </a>
          </div>

          <div class="list-box">
            <div
              class="list"
              v-for="(arr, i) in productList"
              :key="'productList' + i"
            >
              <div class="item" v-for="(item, i) in arr" :key="item.id">
                <span :class="{ 'new-pro': i % 2 === 0 }">新品</span>
                <div class="item-img">
                  <a href="/product/35">
                    <img v-lazy="item.mainImage" />
                  </a>
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar.vue";
import Modal from "@/components/Modal.vue";
import { swiper, swiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          shadowOffset: 10,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      sliderList: [],
      menuList: [],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png",
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg",
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png",
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg",
        },
      ],
      productList: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
      showModal: false,
      publicPath: process.env.BASE_URL,
    };
  },
  mounted() {
    this.axios.get("/getMenuList").then((res) => {
      this.menuList = res.menuList || [];
    });
    this.axios.get("/getSliderList").then((res) => {
      this.sliderList = res.list || [];
    });
    this.init();
  },
  methods: {
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          // slice不会改变原数组
          res.list = res.list.slice(6, 14);
          this.productList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
    addCart(productId) {
      this.showModal = true;
      this.axios
        .post("/carts", {
          productId,
          selected: true,
        })
        .then((res) => {
          this.showModal = true;
          const { cartTotalQuantity = 0 } = res || {};
          this.$store.dispatch("saveCartCount", cartTotalQuantity);
        })
        .catch(() => {
          this.showModal = false;
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss">
.index {
  .swiper-box {
    position: relative;
    .nav-menu {
      width: 264px;
      height: 451px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
      padding: 26px 0;
      background: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          &:hover {
            background: $colorA;

            .children {
              display: block;
            }
          }

          a {
            font-size: $fontI;
            color: $colorG;
            padding-left: 30px;
            position: relative;
            display: block;

            &:after {
              @include bgImg(10px, 15px, "/public/imgs/icon-arrow.png");
              content: "";
              position: absolute;
              top: 17.5px;
              right: 30px;
            }
          }

          .children {
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            left: 264px;
            top: 0;
            border: 1px solid $colorH;
            display: none;

            ul {
              @include flex();
              height: 75px;

              li {
                height: 75px;
                line-height: 75px;
                width: 241px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-style: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }

    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-button-prev {
        margin-left: 264px;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    .container {
      width: $min-width;
      margin: 0 auto;
      h2 {
        font-size: $fontF;
        line-height: 21px;
        height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }

      .wrapper {
        display: flex;
        .banner-left {
          margin-right: 16px;
          img {
            width: 224px;
            height: 619px;
          }
        }
        .list-box {
          .list {
            @include flex();
            width: 986px;
            margin-bottom: 14px;

            &:last-child {
              margin-bottom: 0;
            }

            .item {
              width: 236px;
              height: 302px;
              background-color: $colorG;
              text-align: center;

              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                line-height: 24px;
                font-size: $fontJ;
                color: $colorG;
                margin-bottom: 14px;

                &.new-pro {
                  background-color: #7ecf68;
                }
                &.kill-pro {
                  background-color: #e82626;
                }
              }
              .item-img {
                margin-bottom: 20px;
                img {
                  width: 100%;
                  height: 159px;
                }
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }

                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }

                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;

                  &:after {
                    content: "";
                    margin-left: 5px;
                    vertical-align: middle;
                    @include bgImg(
                      22px,
                      22px,
                      "/public/imgs/icon-cart-hover.png"
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
