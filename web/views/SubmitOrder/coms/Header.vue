<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
// import { ShoppingCart } from '@element-plus/icons-vue';
defineOptions({
    name: 'Header',
    components: {
    }
})
const router = useRouter();
const appStore = useAppStore();

appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig || {});
</script>
<template>
    <div class="header">
        <div class="w1200 flex-center flex flex-justify-between">
            <el-image class="logo" @click="router.push('/')" :src="websiteConfig.websiteLogo"></el-image>
            <div class="step tl" v-if="$route.meta.navActive">
                <el-steps
                    align-center
                    style="min-width: 500px"
                    :active="$route.meta.navActive || 1"
                    finish-status="success"
                >
                    <el-step title="1、我的购物车" />
                    <el-step title="2、填写核对订单信息" />
                    <el-step title="3、成功提交订单" />
                </el-steps>
            </div>
            <span style="font-size: 20px;" v-else>{{ $route.meta.title }}</span>
        </div>
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
    .step {
        position: relative;
        padding: 0 10px;
        background-color: var(--color-white);
    }
}
</style>
