<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
const route = useRoute();
const appStore = useAppStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig || {});
let key = ref(route.query.goodsName || '');
watch(route, (val) => {
    key.value = val.query.goodsName || '';
})
</script>
<template>
    <div class="header">
        <el-row class="w1200 flex flex-center">
            <el-col :span="6">
                <el-image class="logo" @click="$router.push('/')" :src="websiteConfig.websiteLogo"></el-image>
            </el-col>
            <el-col :span="12">
                <div class="text-align-center">
                    <el-input size="large" v-model="key" placeholder="输入关键词" style="width: 100%;margin-right: 16px;" clearable>
                    <template #append>
                        <el-button size="large" type="primary" @click="$router.push({path: '/goodsList', query: { goodsName: key }})">搜索</el-button>
                    </template>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="text-align-center">
                    <el-button size="large" type="primary">购物车</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.header {
    padding: 20px 0;
    background-color: var(--color-white);
    min-width: 1200px;
    .logo {
        cursor: pointer;
        height: 64px;
    }
}
</style>
