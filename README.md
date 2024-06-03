# midway-shop

基于 Midway、Vue 3 组装的 SSR 框架，简单、易学易用、方便扩展、集成Midway框架，Vue SSR 框架。

## 使用文档

 - [http://midway-vue3-ssr.liqingsong.cc/](http://midway-vue3-ssr.liqingsong.cc/)
 - [Github](https://github.com/lqsong/midway-vue3-ssr)
 - [Gitee](https://gitee.com/lqsong/midway-vue3-ssr)

## 实战案例

-   [lqsblog-frontend-midway-vue3-ssr](https://github.com/lqsong/lqsblog-frontend-midway-vue3-ssr/): 是一个PC端、WAP端自适应展示的一个前端网站前台。


## 后台前端解决方案列表

 - admin-element-vue（[GitHub](https://github.com/lqsong/admin-element-vue)、[Gitee](https://gitee.com/lqsong/admin-element-vue)）
 - admin-antd-vue（[GitHub](https://github.com/lqsong/admin-antd-vue)、[Gitee](https://gitee.com/lqsong/admin-antd-vue)）
 - admin-antd-react（[GitHub](https://github.com/lqsong/admin-antd-react)、[Gitee](https://gitee.com/lqsong/admin-antd-react)）
 - electron-admin-element-vue（[GitHub](https://github.com/lqsong/electron-admin-element-vue)、[Gitee](https://gitee.com/lqsong/electron-admin-element-vue)）
 - electron-admin-antd-vue（[GitHub](https://github.com/lqsong/electron-admin-antd-vue)、[Gitee](https://gitee.com/lqsong/electron-admin-antd-vue)）
 - electron-admin-antd-react（[GitHub](https://github.com/lqsong/electron-admin-antd-react)、[Gitee](https://gitee.com/lqsong/electron-admin-antd-react)）
 - admin-vue3-micro-qiankun（[GitHub](https://github.com/lqsong/admin-vue3-micro-qiankun)、[Gitee](https://gitee.com/lqsong/admin-vue3-micro-qiankun)）

## 前台前端SSR解决方案列表

 - midway-vue3-ssr（[GitHub](https://github.com/lqsong/midway-vue3-ssr)、[Gitee](https://gitee.com/lqsong/midway-vue3-ssr)）
 - midway-react-ssr（[GitHub](https://github.com/lqsong/midway-react-ssr)、[Gitee](https://gitee.com/lqsong/midway-react-ssr)）

## 快速入门

> 请使用 pnpm , **[pnpm的安装与使用](http://liqingsong.cc/article/detail/26)** 。

### 本地开发

```bash
$ pnpm i
$ pnpm dev
$ open http://localhost:8002/
```

> 推荐使用 pm2 部署 , **[PM2安装与常用命令](http://liqingsong.cc/article/detail/3)** 。

### 部署

```bash
$ pnpm i # 安装开发期依赖
$ pnpm build # 构建项目
$ pnpm prune --production  # 移除开发依赖
$ pnpm start # 启动项目，对应的 pm2 命令为: NODE_ENV=production pm2 start ./bootstrap.js --name midway_vue3_ssr -i 4
```


