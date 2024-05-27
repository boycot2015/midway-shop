<template>
    <div>
        <el-result icon="success" title="订单已提交成功,请尽快完成支付">
            <template #sub-title>
                <div class="flex flex-center">请在 <el-countdown value-style="color: var(--color-price)" format="HH:mm:ss" :value="countdown" /> 内完成支付，逾期订单将自动取消</div>
            </template>
            <template #extra>
                <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
                <el-button type="primary" @click="$router.push('/userCenter/order/detail?orderCode='+payData.orderCode)">查看订单</el-button>
            </template>
        </el-result>
        <!-- {{ payData }} -->
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDataStore } from './store';
import { useRoute } from 'vue-router';
const route = useRoute();
const dataStore = useDataStore();
dataStore.getPayData(route.query.orderCode as string);
const payData = computed(() => dataStore.payData);
const  countdown = computed(() => new Date(payData.value.createTime).getTime() + 1000 * 60 * 60 * 24);
</script>

<style lang="scss" scoped>

</style>