<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>

    <div class="content">
      <div class="item-bg">
        <h2>{{ product.name }}</h2>
        <h3>{{ product.subtitle }}</h3>
        <p>
          <a href="" id="">全球首款双频</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span
            >￥<em>{{ product.price }}</em></span
          >
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in sliderList" :key="item.id">
            <img :src="item.img" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br />慢慢回味每一瞬间的精彩</h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br />
          更能AI精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <div class="video-bg" @click="openVideo"></div>
        <div class="video-box" v-show="showSlide">
          <div class="overlay"></div>
          <div class="video" :class="showSlide">
            <span class="icon-close" @click="closeVideo"></span>
            <video
              autoplay
              muted
              class="video-tag"
              src="/imgs/product/video.mp4"
              controls="controls"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from "@/components/ProductParam";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "product",
  components: {
    ProductParam,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      showSlide: "", //控制动画效果
      product: {}, //商品信息
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      sliderList: [
        { id: 2, img: "/imgs/product/gallery-2.png" },
        { id: 3, img: "/imgs/product/gallery-3.png" },
        { id: 4, img: "/imgs/product/gallery-4.png" },
        { id: 5, img: "/imgs/product/gallery-5.jpg" },
        { id: 6, img: "/imgs/product/gallery-6.jpg" },
      ],
    };
  },
  mounted() {
    // 初始化数据
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let { id } = this.$route.params;
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res;
      });
    },
    buy() {
      let { id } = this.$route.params;
      this.$router.push(`/detail/${id}`);
    },
    openVideo() {
      let vd = document.querySelector(".video-tag");
      vd.play();
      this.showSlide = "slideDown";
    },
    closeVideo() {
      this.showSlide = "slideUp";
      let vd = document.querySelector(".video-tag");
      vd.pause();
      vd.currentTime = 0;
      setTimeout(() => {
        this.showSlide = "";
      }, 600);
    },
  },
};
</script>

<style lang="scss">
.product {
  button {
    margin-left: 10px;
  }
  .content {
    .item-bg {
      background: url("/public/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: $fontA;
        padding-top: 55px;
      }
      h3 {
        font-size: $fontE;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: $fontI;
          color: $colorB;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: $colorB;
        em {
          font-style: normal;
          font-size: $fontB;
        }
      }
    }
    .item-bg-2 {
      background: url("/public/imgs/product/product-bg-2.png") no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url("/public/imgs/product/product-bg-3.png") no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      img {
        width: 100%;
      }
      .desc {
        font-size: $fontH;
        color: $colorB;
        text-align: center;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: $colorG;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: $fontE;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("/public/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        // 视频遮罩
        .overlay {
          @include position(fixed);
          background-color: $colorB;
          opacity: 0.4;
          z-index: 10;
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          opacity: 1;

          // transition: top 0.6s, opacity 0.5s;
          // transition: all 0.6s;

          // &.slide {
          //   top: 50%;
          //   opacity: 1;
          // }
          &.slideDown {
            animation: slideDown 0.6s linear;
            top: 50%;
          }

          &.slideUp {
            animation: slideUp 0.6s linear;
          }

          @keyframes slideDown {
            from {
              top: -50%;
              opacity: 0;
            }
            to {
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              top: 50%;
              opacity: 1;
            }
            to {
              top: -50%;
              opacity: 0;
            }
          }

          .icon-close {
            @include bgImg(20px, 20px, "/public/imgs/icon-close.png");
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 11;
          }

          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            // object-fit类似 background-size
            outline: none;
          }
        }
      }
    }
  }
}
</style>
