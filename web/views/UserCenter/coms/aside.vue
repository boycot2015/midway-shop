<template>
    <div>
        <el-menu
        :default-active="route.meta.navActive&&route.meta.hideInMenu?route.meta.navActive:route.path"
        router
        class="el-menu-vertical"
      >
        <template v-for="item in menu">
            <el-menu-item-group :index="item.path" :key="item.path" :title="item.meta?.title" v-if="item.children && item.children.length && !item.meta?.hideChildren">
            <el-menu-item :index="child.redirect||child.path" :key="child.path" v-show="!child.meta?.hideInMenu" v-for="child in item.children" >
                <el-icon><component :is="child.meta?.icon" /></el-icon>
                {{child.meta?.title}}
            </el-menu-item>
            </el-menu-item-group>
        </template>
      </el-menu>
    </div>
</template>
<script lang="ts" setup>
import UserCenter from '@/router/modules/user';
import { defineOptions } from 'vue';
import { useRoute } from 'vue-router';
import { User, List, Tools, Setting } from '@element-plus/icons-vue';

const route = useRoute();
defineOptions({
    name: 'Aside',
    components: {
        User,
        List,
        Tools,
        Setting
    }
})
const menu = [UserCenter];
</script>

<style lang="scss" scoped>
.el-menu-vertical {
    height: 100vh;
    // border: 1px solid var(--el-border-color);
    border: none;
    box-shadow: 0px 10px 30px var(--el-border-color);
    :deep(.el-menu-item-group__title) {
        text-align: left;
        font-size: 16px;
        // padding-left: 0 !important;
        color: var(--color-font2);
        font-weight: bold;
        border-bottom: 1px solid var(--el-border-color);
    }
}
</style>