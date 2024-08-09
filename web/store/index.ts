import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useAppStore } from './app';
import { useUserStore } from './user';
import { useCartStore } from './cart';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export { useAppStore, useUserStore, useCartStore };
export default pinia;
