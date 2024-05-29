<template>
    <div>
        <el-result icon="success" title="订单已提交成功,请尽快完成支付">
            <template #sub-title>
                <div class="flex flex-center">还需支付<span class="color-price">￥{{payData.payCash||payData.totalPayCashAmount}}</span>请在 <el-countdown value-style="color: var(--color-price)" format="HH:mm:ss" :value="countdown" /> 内完成支付，逾期订单将自动取消</div>
            </template>
            <template #extra>
                <div class="pay-way">
                    <el-radio-group v-model="payData.payMethod" @change="payMethodChange">
                        <el-radio-button :value="1001">微信</el-radio-button>
                        <el-radio-button :value="1002">支付宝</el-radio-button>
                    </el-radio-group>
                    <div class="qr-code">
                        <QrCode :color="{ dark: '#000000ff', light: '#ffffffff' }" type="image/png" :value="dataStore.payData.qrCode"></QrCode>
                    </div>
                </div>
                <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
                <el-button type="primary" @click="$router.push('/userCenter/order/detail?orderCode='+payData.orderCode)">查看订单</el-button>
            </template>
        </el-result>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDataStore } from './store';
import { useRoute } from 'vue-router';
import QrCode from 'vue-qrcode'
const route = useRoute();
const dataStore = useDataStore();
dataStore.getPayData(route.query.orderCode as string);
const payData = computed(() => dataStore.payData);
const  countdown = computed(() => new Date(payData.value.createTime).getTime() + 1000 * 60 * 60 * 24);
const payMethodChange = (value: number) => {
    dataStore.getOrderPayData({ payMethod: value, orderCode: payData.value.orderCode, browserType: 1001 });
}
payMethodChange(1001);
let timer = setInterval(() => {
    dataStore.getPayData(payData.value.orderCode).then(() => {
        if (payData.value.payStatus !== 1001) {
            clearInterval(timer)
        }
    })
}, 2000)
</script>

<style lang="scss" scoped>
.qr-code {
    width: 280px;
    height: 280px;
    margin: 20px auto;
    border: 1px solid var(--color-border);
    img {
        height: 100%;
        width: 100%;
    }
}
</style>