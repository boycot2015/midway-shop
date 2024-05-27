<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter, RouteMeta } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { ArrowDown } from '@element-plus/icons-vue';
const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();
appStore.getWebsiteConfig();
const meta = computed<RouteMeta>(()=> route.meta);
const token = computed<any>(()=> userStore.token);
const userInfo = computed<any>(()=> userStore.userInfo);
const isMounted = ref(false);
onMounted(() =>{
    isMounted.value = true;
})
</script>
<template>
    <div class="nav-bar" v-if="isMounted">
        <el-row class="w1200">
            <el-col :span="12"></el-col>
            <el-col :span="12">
                <nav>
                    <router-link to="/" :class="{'active': meta.navActive === 'home'}">首页</router-link><el-divider direction="vertical" />
                    <span v-if="token">
                        <el-dropdown @command="(val) => {
                            userStore[val]();
                            router.push('/login');
                        }" trigger="hover" style="line-height: 32px;">
                            <router-link  to="/userCenter" :class="{'active': meta.navActive === 'userCenter'}" class="el-dropdown-link">
                                {{userInfo.nickName }}
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </router-link>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </span>
                    <router-link to="/login" v-else :class="{'active': meta.navActive === 'login'}">登录</router-link>
                    <el-divider direction="vertical" />
                    <!-- <router-link to="/goodsList" :class="{'active': meta.navActive === 'goodsList'}">商品中心</router-link><el-divider direction="vertical" /> -->
                    <!-- <router-link :to="{path:'/localapi', query: {'uid':10}}" :class="{'active': meta.navActive === 'localapi'}">个人中心</router-link> -->
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
  text-align: right;
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
