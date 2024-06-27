<template>
    <div class="w1200">
        <el-row class="user-main" :gutter="20">
            <el-col :span="4" class="user-main-left" v-if="!$route.meta.hideMenu">
                <Aside></Aside>
            </el-col>
            <el-col :span="$route.meta.hideMenu?24:20" class="user-main-right">
                <router-view v-slot="{ Component, route }">
                    <transition name="fade" mode="in-out">
                        <component :is="Component" :key="route.path" />
                    </transition>
                </router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
export default defineComponent({
//     async asyncData({store, route, router, ctx}) {
//         // const query = route.query || {};
//   },
  seo({store}) {
   const userStore = useUserStore(store);
   return {
      title: userStore.userInfo.nickName + '-个人中心',
   }
  }
})
</script>
<script setup lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/store/user';
import Aside from './coms/aside.vue'
</script>
<style lang="scss" scoped>
// .user-main-right {
//     background-color: var(--color-white);
// }
</style>