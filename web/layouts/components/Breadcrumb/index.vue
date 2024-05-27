<template>
    <div class="w1200 breadcrumb">
        <el-breadcrumb :separator="'>'">
            <el-breadcrumb-item :to="item.path" v-for="item in route.matched.filter(el => !el.redirect || el.name === route.meta.navActive)">{{item.meta.title || '首页'}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss" scoped>
.breadcrumb {
    margin: 20px auto;
    // min-width: 1200px;
}
</style>