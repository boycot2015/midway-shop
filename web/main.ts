import { createSSRApp } from 'vue';
import App from '@/App.vue';
import { createRouter } from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 样式初始化
import 'normalize.css';

// 全局样式
import '@/assets/css/global.scss';

// 引入 ElementUI
import ElementPlus from 'element-plus';

export function createApp(routerType: RouterType) {
  const app = createSSRApp(App);
  const router = createRouter(routerType);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(router);
  app.use(pinia);
  app.use(ElementPlus);

  return { app, router, pinia };
}
