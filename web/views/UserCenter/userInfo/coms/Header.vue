<template>
    <div class="user-info-header" :style="{background: userInfo.cardBackgroundValue ?`url(${userInfo.cardBackgroundValue}) right/contain no-repeat, url(${userInfo.cardBackgroundValue}) left/8000% no-repeat`: ''}">
        <div class="user-info-header-cover" v-if="userInfo.cardBackgroundValue" :style="{top: userInfo.cardBackgroundValue.includes('icon_dengji') ? '-20px' : '0'}"><img :src="userInfo.cardBackgroundValue" alt=""></div>
        <el-row :gutter="30">
            <el-col :span="8">
                <div class="flex flex-center avatar user-info-header-section">
                    <el-avatar :src="userInfo.headPortrait"></el-avatar>
                    <div class="flex text flex-column ml20">
                        <p class="title">{{ userInfo.nickName }}</p>
                        <div class="phone">{{ userInfo.phone }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
            <el-col :span="5">
                <div class="flex text flex-justify-center flex-column user-info-header-section">
                    <p class="title color-primary">{{ userInfo.totalIntegralAmount || 0 }}<span v-if="websiteConfig">{{ websiteConfig.websiteUnit }}</span></p>
                    <p class="txt">余额 <span class="color-primary">{{ userInfo.integralPermanentAmount }}{{ websiteConfig.websiteUnit }}</span></p>
                </div>
            </el-col>
            <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
            <el-col :span="5">
                <div class="flex text flex-justify-center flex-column user-info-header-section">
                    <p class="title color-primary">{{ userInfo.overdue30IntegralAmount || 0 }}<span v-if="websiteConfig">{{ websiteConfig.websiteUnit }}</span></p>
                    <p class="txt">即将到期 <span class="color-primary">{{ userInfo.overdue30IntegralAmount || 0 }}<span v-if="websiteConfig">{{ websiteConfig.websiteUnit }}</span></span></p>
                </div>
            </el-col>
            <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
            <el-col :span="5"></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';
const userStore = useUserStore();
const appStore = useAppStore();
const websiteConfig = computed(() => appStore.websiteConfig || {})
const userInfo = computed(() => userStore.userInfo)
</script>

<style lang="scss" scoped>
.user-info {
    &-header {
        position: relative;
        padding: 20px;
        background-color: var(--color-white);
        &-section {
            height: 100%;
        }
        .text {
            text-align: left;
            .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
        .el-avatar {
            width: 80px;
            height: 80px;
            border: 1px solid var(--color-border);
        }
        &-cover {
            position: absolute;
            right: 0;
            top: -25px;
            height: 100%;
            img {
                height: 100%;
            }
        }
    }
}
</style>