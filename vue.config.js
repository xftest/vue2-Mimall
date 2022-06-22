const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    lintOnSave: false, //关闭eslint检查
    devServer: {
        host: "localhost",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://mall-pre.springboot.cn",
                changeOrigin: true, //如果设置成true：发送请求头中host会设置成target
                pathRewrite: {
                    "/api": "",
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "~@/assets/scss/reset.scss"
                @import "~@/assets/scss/base.scss"
                @import "~@/assets/scss/config.scss"
                @import "~@/assets/scss/mixin.scss"
                @import "~@/assets/scss/button.scss"
                `,
            },
            scss: {
                additionalData: `
                @import "~@/assets/scss/reset.scss";
                @import "~@/assets/scss/base.scss";
                @import "~@/assets/scss/config.scss";
                @import "~@/assets/scss/mixin.scss";
                @import "~@/assets/scss/button.scss";
                `,
            },
        },
    },
    productionSourceMap: false, // 关闭sourcemap
    chainWebpack: (config) => {
        // 删除预加载 rel= prefetch预加载标签,防止一次性把文件都拉出来
        config.plugins.delete("prefetch");
        config.plugin("html").tap((args) => {
            args[0].title = "仿小米商城";
            return args;
        });
    },
});