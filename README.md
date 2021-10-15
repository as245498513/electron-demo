# electron-demo

基于 electron + vue + ElementUI 的桌面应用 demo。

## 相关文档

[electronjs](https://www.electronjs.org/)

[SimulatedGREG/electron-vue](https://github.com/SimulatedGREG/electron-vue)

[ElementUI](https://element.eleme.cn/#/zh-CN)

[Vue.js2](https://cn.vuejs.org/v2/guide/index.html)

## 构建步骤

``` bash
# 安装依赖
yarn

# 启动
yarn run dev

# 编译
yarn run build

# lint
yarn run lint
```

## 开发说明

1. 启动界面在 `src/renderer/components/Index.vue`

2. 跟正常 vue 的写法完全一致，如果之前写过 vue，可以直接上手开发

3. 可以使用 nodejs api

4. demo 里面引入了 ElementUI，可以使用 ElementUI 的组件

5. http 请求可使用 axios 发起

