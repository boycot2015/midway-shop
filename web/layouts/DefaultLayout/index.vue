<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { useCartStore } from '@/store/cart';
export default defineComponent({
    async asyncData({store, route, router, ctx}) {
        // const query = route.query || {};
        const appStore = useAppStore();
        if (appStore.websitePage.websitePcFixedList) {
            return
        }
        await appStore.getWebsiteConfig();
  },
  seo({store}) {
//    const dataStore = useAppStore(store);
   return {
      title: '首页',
   }
  }
})
</script>
<script lang="ts" setup>
import NavBar from '../components/NavBar/index.vue';
import Header from '../components/Header/index.vue';
import Footer from '../components/Footer/index.vue';
import NavColumn from '../components/NavColumn/index.vue';
import Breadcrumb from '../components/Breadcrumb/index.vue';
const cartStore = useCartStore();
const userStore = useUserStore();
onMounted(async () => {
    if (userStore.token) {
        await cartStore.getCartCount();
    }
})
const SSR = import.meta.env.SSR;
</script>
<template>
    <div class="layout" v-if="!SSR">
        <NavBar></NavBar>
        <Header v-if="!$route.meta.hideHeader"></Header>
        <div class="layout-content">
            <NavColumn v-if="!$route.meta.hideNavColumn"></NavColumn>
            <Breadcrumb v-if="!$route.meta.hideBreadcrumb"></Breadcrumb>
            <router-view></router-view>
        </div>
        <Footer></Footer>
        <el-backtop style="z-index: 10;"></el-backtop>
    </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--color-bg);
}
.layout-content {
    min-height: calc(100vh - 182px);
    background-color: var(--color-bg);
    min-width: 1200px;
}
</style>
