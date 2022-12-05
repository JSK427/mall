const { defineConfig } = require("@vue/cli-service");
const prodDir = "data-view";
const prodSetting =
  process.env.NODE_ENV === "production"
    ? {
        publicPath: `/${prodDir}`,
        outputDir: `${prodDir}`,
      }
    : {};
module.exports = defineConfig({
  transpileDependencies: true,
  //配置webpack config
  configureWebpack: {
    //路径相关
    resolve: {
      //路径文件后缀名可省略
      extensions: [],
      //别名
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  productionSourceMap: false,
  ...prodSetting,
});
