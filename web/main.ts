import { createSSRApp } from 'vue';
import App from '@/App.vue';
import { createRouter } from '@/router';
import store from './store';

// vue-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// 样式初始化
import 'normalize.css';

// 全局样式
// import '@/assets/css/global.scss';

// 引入 ElementUI
import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function createApp(routerType: RouterType) {
  const app = createSSRApp(App);
  const router = createRouter(routerType);
  //   app.use(pinia);
  app.use(store);
  app.use(router);
  app.use(ElementPlus, {
    // locale: zhCn,
  });
  library.add(fas);
  return { app, router, pinia: store };
}
