<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, RouteMeta } from 'vue-router';
import { useAppStore } from '@/store/app';
const route = useRoute();
const appStore = useAppStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig);
const meta = computed<RouteMeta>(() => route.meta);
let key = ref('');
</script>
<template>
  <div class="nav-bar">
    <el-row class="w1200">
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <nav>
          <router-link to="/" :class="{ active: meta.navActive === 'home' }"
            >首页</router-link
          ><el-divider direction="vertical" />
          <router-link
            to="/goodsList"
            :class="{ active: meta.navActive === 'goodsList' }"
            >商品中心</router-link
          ><el-divider direction="vertical" />
          <router-link
            :to="{ path: '/userCenter/index' }"
            :class="{ active: meta.navActive === 'userCenter' }"
            >个人中心</router-link
          >
        </nav>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  background-color: var(--color-bg);
}
nav {
  line-height: 32px;
}

nav a {
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
}

nav a.active {
  color: #42b983;
}
</style>
