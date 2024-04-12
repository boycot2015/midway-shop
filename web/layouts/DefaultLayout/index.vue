<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, RouteMeta } from 'vue-router';
import { useAppStore } from '@/store/app';
const route = useRoute();
const appStore = useAppStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig);
const meta = computed<RouteMeta>(()=> route.meta);
let key = ref('')
</script>
<template>
    <div class="nav-bar">
        <el-row class="w1200">
            <el-col :span="12"></el-col>
            <el-col :span="12">
                <nav>
                    <router-link to="/" :class="{'active': meta.navActive === 'home'}">Home</router-link> |
                    <router-link to="/goodsList" :class="{'active': meta.navActive === 'goodsList'}">goodsList</router-link> |
                    <router-link :to="{path:'/localapi', query: {'uid':10}}" :class="{'active': meta.navActive === 'localapi'}">LocalApi</router-link>
                </nav>
            </el-col>
        </el-row>
    </div>
    <el-row class="header w1200 flex flex-center">
        <el-col :span="8">
            <el-image style="cursor:pointer;" @click="$router.push('/')" :src="websiteConfig.websiteLogo"></el-image>
        </el-col>
        <el-col :span="16">
            <div class="text-align-left">
                <el-input v-model="key" placeholder="输入关键词" style="width: 320px;margin-right: 16px;"></el-input>
                <el-button type="primary" @click="$router.push('/goodsList?goodsName='+key)">搜索</el-button>
                <el-button>购物车</el-button>
            </div>
        </el-col>
    </el-row>
    <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-bar {
    background-color: var(--color-bg);
}
nav {
  line-height: 32px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.active {
  color: #42b983;
}
</style>
