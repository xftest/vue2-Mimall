import Vue from "vue";
import axios from "axios";
import VueLazyload from "vue-lazyload";
import VueCookie from "vue-cookie";
import { Message } from "element-ui";
import VDistpicker from "v-distpicker";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = env.baseURL;
const mock = true;
if (mock) {
    // require 从上到下，执行的时候才会加载文件
    // import 预编译阶段加载
    require("./mock/api");
}
// axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;

axios.interceptors.request.use(function(config) {
    return config;
});

// response 第一个function 拦截 接口响应为200、status为非0的
// response 第一个拦截服务器的状态，比如500，接口挂了
axios.interceptors.response.use(
    function(response) {
        let res = response.data;
        let { pathname } = location;
        if (res.status == 0) {
            return res.data;
        } else if (res.status == 10) {
            if (pathname != "/index" && pathname != "/login") {
                window.location.href = `/login?redirect=${encodeURIComponent(
          pathname
        )}`;
                return Promise.reject(res);
            }
        } else {
            Message.warning(res.msg);
            return Promise.reject(res);
        }
    },
    function(error) {
        let {
            response: {
                data: { message = "" },
            },
        } = error || {};

        Message.error(message);
        return Promise.reject(error);
    }
);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
// Vue.prototype.$message = Message;

Vue.use(VueLazyload, {
    loading: "/imgs/loading-svg/loading-bubbles.svg",
});
Vue.use(VueCookie);
Vue.component("v-distpicker", VDistpicker);

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");