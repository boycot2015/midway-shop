<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, RouteMeta } from 'vue-router';
import { useAppStore } from '@/store/app';
import NavBar from '../components/NavBar/index.vue';
import Header from '../components/Header/index.vue';
import Footer from '../components/Footer/index.vue';
const route = useRoute();
const appStore = useAppStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig);
const meta = computed<RouteMeta>(()=> route.meta);
let key = ref('')
</script>
<template>
    <NavBar></NavBar>
    <Header></Header>
    <div class="layout-content">
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
}
.layout-content {
    min-height: calc(100vh - 182px);
}
</style>
