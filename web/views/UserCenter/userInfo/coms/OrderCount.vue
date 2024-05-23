<template>
    <div class="user-info-order">
        <el-row title="我的订单" :gutter="60">
            <el-col :span="4" v-for="item in list" :key="item.prop">
                <router-link :to="`/userCenter/order?status=${item.orderStatus}`">
                    <el-card shadow="hover" class="tc">
                        <el-badge :value="userInfo[item.prop || '']" :hidden="!userInfo[item.prop || '']"><el-icon><component :is="item.icon" /></el-icon></el-badge>
                        <p class="title">{{item.title}}</p>
                    </el-card>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import  { computed, ref } from 'vue';
import request from '@/utils/request';
import { Wallet, Box, Van, Finished, Service, List } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';

defineOptions({
    name: 'OrderCount',
    components: {
        Wallet,
        Box,
        Van,
        Finished,
        Service,
        List
    }
})
function getInfo (data: any = {}): Promise<any> {
  return request({
    url: '/api/member/usercenter',
    method: 'get',
    data,
  });
}
getInfo().then((res: any) => {
    if (res && res.success) {
        userStore.setUserInfo(res.data);
    }
})
const userStore = useUserStore();
const appStore = useAppStore();
const userInfo = computed(() => userStore.userInfo);
const list = ref([
    {title: '全部订单', prop: '', icon: 'List', orderStatus: '0'},
    {title: '待支付', prop: 'waitPayCount', icon: 'Wallet', orderStatus: '1001'},
    {title: '待发货', prop: 'waitDeliveryCount', icon: 'Box', orderStatus: '1002'},
    {title: '已发货', prop: 'waitTakeCount', icon: 'Van', orderStatus: '1003'},
    {title: '已完成', prop: 'completeOrderCount', icon: 'Finished', orderStatus: '1004'},
    // {title: '售后', prop: 'afterOrderCount', icon: 'Service'},
    ]);
</script>

<style lang="scss" scoped>
.user-info-order {
    padding: 20px;
    background-color: var(--color-white);
    margin-top: 20px;
    .el-card {
        border: 0;
        cursor: pointer;
        // box-shadow: none;
        .el-icon {
            font-size: 26px;
        }
        .title {
            margin-top: 10px;   
            font-size: 14px;
        }
    }
}
</style>