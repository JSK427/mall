## before

### 目录结构划分

- assets 资源
  - css
  - image
- common 公共 js 方法，常量
- components 公共组件
  - common 完全抽离的组件
  - content 与当前业务相关的组件
- network 网络相关
- router 路由相关
- store vuex
- views 大型视图

### CSS 文件的引入

- normalize.css 对属性进行重置（引入到 base 中）
- base.css 自定义的样式
  - :root 获取根元素
  - --color-text css 中定义变量（学习使用 less、sess)

### 配置路径别名

**新建 vue.config.js**

```javascript
const { defineConfig } = require("@vue/cli-service");
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
});
```

### 配置开发规范

**新建.editorconfig 文件**

```javascript
root =true

[*]
charset = utf-8
indent_style = space
indet_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```
