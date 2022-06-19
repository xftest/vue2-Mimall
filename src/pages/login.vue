<template>
  <div class="login">
    <div class="container">
      <a href="/index">
        <img src="/imgs/login-logo.png" />
      </a>
    </div>

    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" v-on:click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-link">
        <a href="/index">主页</a>
        <a href="javascript:;">友情链接</a>
        <a href="javascript:;">友情链接</a>
        <a href="javascript:;">友情链接</a>
        <a href="javascript:;">友情链接</a>
      </div>
      <div class="copyright">
        京ICP备19036348号-2&nbsp;&nbsp;京公网安备 11010502045163号
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  data() {
    return {
      username: "",
      password: "",
      userId: "",
      res: {},
    };
  },
  methods: {
    ...mapActions(["saveUsername"]),
    login() {
      let { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          this.$cookie.set("userId", res.id, { expires: "Sessions" });
          this.saveUsername({ username });
          const { redirect } = this.$route.query;
          let routerName = redirect
            ? redirect.slice(1, redirect.length).split("/").join("-")
            : "index";
          this.$router.push({
            name: routerName,
            params: {
              from: "login",
            },
          });
        });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "admin1",
          password: "admin1",
          emial: "admin1@163.com",
        })
        .then((res) => {
          Message.success(res || "注册成功");
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/public/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      .login-form {
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: $colorG;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: $fontE;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: $colorA;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          width: 100%;
          display: inline-block;
          height: 50px;
          border: 1px solid $colorH;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin-top: 10px;
          font-size: $fontI;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: $fontJ;
          cursor: pointer;
          .sms {
            color: $colorA;
          }
          .reg {
            color: $colorD;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-link {
      a {
        color: $colorD;
        display: inline-block;
        position: relative;
        margin-right: 8px;
        padding-right: 8px;
        &:before {
          position: absolute;
          right: 0;
          top: 7px;
          width: 1px;
          height: 10px;
          content: "";
          border-right: 1px solid $colorF;
        }

        &:last-child:before {
          border: none;
        }
        span {
          margin: 0 10px;
        }
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
