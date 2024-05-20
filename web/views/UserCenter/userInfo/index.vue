<template>
    <div class="user-info">
        <div class="user-info-header">
            <el-row :gutter="30">
                <el-col :span="6">
                    <div class="flex flex-center avatar user-info-header-section">
                        <el-avatar :src="userStore.userInfo.headPortrait"></el-avatar>
                        <div class="flex text flex-column ml20">
                            <p class="title">{{ userStore.userInfo.nickName }}</p>
                            <div class="phone">{{ userStore.userInfo.phone }}</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
                <el-col :span="5">
                    <div class="flex text flex-justify-center flex-column user-info-header-section">
                        <p class="title color-primary">{{ userStore.userInfo.totalIntegralAmount || 0 }}<span>{{ appStore.websiteConfig.websiteUnit }}</span></p>
                        <p class="txt">余额 <span class="color-primary">{{ userStore.userInfo.integralPermanentAmount }}</span></p>
                    </div>
                </el-col>
                <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
                <el-col :span="5">
                    <div class="flex text flex-justify-center flex-column user-info-header-section">
                        <p class="title color-primary">{{ userStore.userInfo.overdue30IntegralAmount || 0 }}<span>{{ appStore.websiteConfig.websiteUnit }}</span></p>
                        <p class="txt">即将到期 <span class="color-primary">{{ userStore.userInfo.overdue30IntegralAmount || 0 }}<span>{{ appStore.websiteConfig.websiteUnit }}</span></span></p>
                    </div>
                </el-col>
                <el-col :span="1"><el-divider style="height: 100%;" direction="vertical" /></el-col>
                <el-col :span="5"></el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';
import request from '@/utils/request';
function getInfo (params: any = {}): Promise<any> {
  return request({
    url: '/api/member/basicinfo',
    method: 'get',
    data: {
        clientType: 1001,
        ...params
    },
  });
}
const userStore = useUserStore();
const appStore = useAppStore();
getInfo().then((res: any) => {
    if (res && res.success) {
        userStore.setUserInfo(res.data);
    }
})
</script>

<style lang="scss" scoped>
.user-info {
    &-header {
        padding: 20px;
        background-color: var(--color-white);
        &-section {
            height: 100%;
        }
        .text {
            text-align: left;
            .title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        }
        .el-avatar {
            width: 80px;
            height: 80px;
            border: 1px solid var(--color-border);
        }
    }
}
</style>