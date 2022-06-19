<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:order>
        <span>请谨防钓鱼链接或诈骗电话，了解更多> </span>
      </template>
    </order-header>

    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- <loading v-if="loading"></loading> -->
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    {{ item.productName }}
                    {{ item.totalPrice + "元" }}
                    {{ " x " + item.quantity }}
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="isPaySuccess(order.status)">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">
                  {{ order.statusDesc }}
                </a>
              </div>
            </div>
          </div>

          <!-- 分页加载数据 -->
          <el-pagination
            v-if="false"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>

          <!-- 加载更多按钮 加载数据 -->
          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="loading" @click="loadMore">
              加载更多
            </el-button>
          </div>

          <!-- 滚动到底部加载数据 -->
          <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="410"
            v-if="true"
          >
            <img
              src="/imgs/loading-svg/loading-spinning-bubbles.svg"
              v-show="loading"
            />
          </div>
          <no-data v-if="!loading && list.length == 0">
            <template v-slot:text>
              <p>当前暂无提交的订单记录</p>
            </template>
          </no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import Loading from "@/components/Loading.vue";
import NoData from "@/components/NoData.vue";
import { Pagination, Button } from "element-ui";
import infiniteScroll from "vue-infinite-scroll";
import { PAY_STATUS } from "@/util";
export default {
  name: "order-list",
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
  },
  directives: { infiniteScroll },
  data() {
    return {
      loading: false,
      list: [],
      order: {},
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showNextPage: true, //加载更多，是否显示按钮
      busy: false, // busy 为false 滚动加载才会生效
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    // 滚动加载
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getOrderList();
      }, 500);
    },

    // 加载更多按钮
    loadMore: function () {
      this.pageNum++;
      this.getOrderList();
    },

    // 分页器
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    getOrderList() {
      this.loading = true;
      this.busy = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.loading = false;
          this.busy = false;
          const { list = [], total = 0, hasNextPage, pageNum = 0 } = res || {};
          this.list = this.list.concat(list);
          this.total = total;
          this.pageNum = pageNum;
          this.showNextPage = hasNextPage;
          if (hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: { orderNo },
      });
    },
    isPaySuccess(status) {
      return status === PAY_STATUS.SUCCESS;
    },
  },
};
</script>

<style lang="scss">
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 16px;
        box-shadow: 1px 1px 10px $colorJ;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(34px);
          background-color: #e9e9e9;
          padding: 0 43px;
          font-size: $fontJ;
          color: $colorC;
          .item-info {
            font-size: $fontK;
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: $fontI;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 70px;
              .good-img {
                width: 50px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: $fontJ;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(70px);
            font-size: $fontJ;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }

      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
