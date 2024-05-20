<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus';
import Category from '../Category/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();

const data = computed<any>(()=> appStore.$state.websitePage)
const columnName = ref(route.name === 'Index' ? '/home': route.name);
const websitePcFixedList = data.value?.websitePcFixedList?.map(el => {
    el.fixedContent = el.fixedContent && typeof el.fixedContent === 'string' ? JSON.parse(el.fixedContent) : el.fixedContent
    el.columnName = '/home'
    return el
})

watch(route, (val) => {
    columnName.value = val.name === 'Index' ? '/home' : val.name
});
const handleClick = (tab: TabsPaneContext, event: Event, navLinkList) => {
    if (tab.paneName) {
        router.push(tab.paneName as  string);
    }
};
</script>
<template>
    <div class="fixed-nav" v-if="route.meta && route.meta.navActive">
        <div class="fixed-nav-list w1200" v-for="item in websitePcFixedList" :key="item.columnName">
            <el-button type="primary">
                <el-popover width="1200px" :show-arrow="false" :offset="0" effet="dark" :teleported="false" v-if="route.name !== 'Index'">
                 <template #reference>
                     <span class="fixed"> 商品分类</span>
                 </template>
                 <Category></Category>
                </el-popover>
                <span class="fixed" v-else>
                 商品分类
                </span>
            </el-button>
            <Category class="fixed" v-if="route.name == 'Index'"></Category>
            <el-tabs v-model="columnName" @tab-click="handleClick">
                <el-tab-pane label="首页" name="/home"></el-tab-pane>
                <el-tab-pane label="商品中心" name="/goodsList"></el-tab-pane>
                <el-tab-pane v-for="val in item.fixedContent.navLinkList" :label="val.columnName" :name="val.columnLink" :key="val.columnName"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fixed-nav {
    width: 100%;
    // min-width: 1200px;
    border-bottom: 2px solid var(--color-primary);
    background-color: var(--color-white);
    &-list {
        position: relative;
        display: flex;
        align-items: center;
    }
    .el-button {
        line-height: 40px;
        height: 40px;
        border-radius: 0;
        margin-right: 20px;
        position: relative;
    }
    :deep(.el-tabs__header) {
        margin-bottom: 0;
        .el-tabs__nav-wrap::after {
            height: 0;
        }
        .el-tabs__active-bar {
            display: none;
        }
    }
}
</style>
