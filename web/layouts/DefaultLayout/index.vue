<script lang="ts" >
import { defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/store/app';
import { useCartStore } from '@/store/cart';
export default defineComponent({
    async asyncData({store, route, router, ctx}) {
        // const query = route.query || {};
        const appStore = useAppStore();
        const cartStore = useCartStore();
        await cartStore.getCartData();
        if (appStore.websitePage.websitePcFixedList) {
            return
        }
        await appStore.getWebsiteConfig();
  },
  seo({store}) {
   const dataStore = useAppStore(store);
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

</script>
<template>
    <NavBar></NavBar>
    <Header></Header>
    <div class="layout-content">
        <NavColumn></NavColumn>
        <Breadcrumb v-if="!$route.meta.hideBreadcrumb"></Breadcrumb>
        <router-view></router-view>
    </div>
    <Footer></Footer>
    <el-backtop></el-backtop>
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
