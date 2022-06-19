import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/index";
import Home from "./pages/home";
Vue.use(Router);

const routes = [{
        path: "/",
        name: "home",
        component: Home,
        redirect: "/index",
        children: [
            { path: "index", name: "index", component: Index },
            {
                path: "product/:id",
                name: "product",
                component: () =>
                    import ("./pages/product"),
            },
            {
                path: "detail/:id",
                name: "detail",
                component: () =>
                    import ("./pages/detail"),
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("./pages/login"),
    },
    {
        path: "/cart",
        name: "cart",
        component: () =>
            import ("./pages/cart"),
    },
    {
        path: "/order",
        name: "order",
        component: () =>
            import ("./pages/order"),
        children: [{
                path: "confirm",
                name: "order-confirm",
                component: () =>
                    import ("./pages/orderConfirm"),
            },
            {
                path: "list",
                name: "order-list",
                component: () =>
                    import ("./pages/orderList"),
            },
            {
                path: "pay",
                name: "order-pay",
                component: () =>
                    import ("./pages/orderPay"),
            },
            {
                path: "alipay",
                name: "alipay",
                component: () =>
                    import ("./pages/alipay"),
            },
        ],
    },
];

export default new Router({ mode: "history", routes });