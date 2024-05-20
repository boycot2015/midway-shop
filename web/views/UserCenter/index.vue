<template>
    <div class="w1200">
        <el-row class="user-main" :gutter="30">
            <el-col :span="4" class="user-main-left">
                <Aside></Aside>
            </el-col>
            <el-col :span="20" class="user-main-right">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Aside from './coms/aside.vue'
</script>

<style lang="scss" scoped>
// .user-main-right {
//     background-color: var(--color-white);
// }
</style>