import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
    username: "", //登录用户名
    cartCount: 0, //购物车商品数量
};
export default new Vuex.Store({
    state,
    actions,
    mutations,
});