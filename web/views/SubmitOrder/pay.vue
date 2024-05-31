<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-descriptions style="height: 100%;"  class="flex flex-center flex-justify-center flex-column price-text">
                    <el-descriptions-item class-name="fr" :span="3" label="应付总额：">
                        <span>{{payData.totalPayIntegralAmount||0}}{{payData.integralUnit||0}} + ￥{{payData.totalPayCashAmount||payData.payCash}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item class-name="fr" :span="3" label="已 支 付：">
                        <span>{{payData.totalPayIntegralAmount||0}}{{payData.integralUnit||0}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item class-name="fr" :span="3" label="还需支付：">
                        <span class="color-price">￥{{payData.totalPayCashAmount||payData.payCash}}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
            <el-col :span="2"><el-divider style="height: 100%;" direction="vertical" /></el-col>
            <el-col :span="12">
                <el-result icon="success" title="订单已提交成功,请尽快完成支付">
                    <template #sub-title>
                        <div class="flex flex-center">
                            请在 <el-countdown value-style="color: var(--color-price);margin: 0 5px;font-size: 18px;" format="HH:mm:ss" :value="countdown" /> 内完成支付，逾期订单将自动取消
                        </div>
                    </template>
                    <template #extra>
                        <div class="pay-way">
                            <el-radio-group v-model="payData.payMethod" @change="payMethodChange">
                                <el-radio-button :value="1001">微信</el-radio-button>
                                <el-radio-button :value="1002">支付宝</el-radio-button>
                            </el-radio-group>
                            <div class="qr-code" v-if="dataStore.payData?.qrCode">
                                <QrCode :color="{ dark: '#000000ff', light: '#ffffffff' }" type="image/png" v-if="payData.payMethod==1001&&!dataStore.loading" :value="dataStore.payData.qrCode"></QrCode>
                                <iframe
                                v-else-if="!dataStore.loading"
                                :src="dataStore.payData.qrCode"
                                frameborder="no"
                                marginwidth="0"
                                marginheight="0"
                                scrolling="no"
                                width="280"
                                height="280"
                                style="overflow:hidden;"></iframe>
                            </div>
                        </div>
                        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
                        <el-button type="primary" @click="$router.push('/userCenter/order/detail?orderCode='+payData.orderCode)">查看订单</el-button>
                    </template>
                </el-result>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount } from "vue";
import { useDataStore } from './store';
import { useRoute } from 'vue-router';
import QrCode from 'vue-qrcode'
const route = useRoute();
const dataStore = useDataStore();
dataStore.getPayData(route.query.orderCode as string);
const payData = computed(() => dataStore.payData);
const  countdown = computed(() => new Date(payData.value.createTime).getTime() + 1000 * 60 * 60 * 24);
const payMethodChange = (value: number) => {
    payData.value.payMethod = value
    dataStore.getOrderPayData({ payMethod: value, orderCode: payData.value.orderCode, browserType: 1001 });
}
payMethodChange(1001);
payData.value.payMethod = 1001;
let timer = setInterval(() => {
    dataStore.getPayData(payData.value.orderCode).then(() => {
        if (payData.value.payStatus !== 1001) {
            clearInterval(timer)
        }
    })
}, 2000)
onBeforeUnmount(() => {
    clearInterval(timer);
})
</script>

<style lang="scss" scoped>
// .price-text {
//     background-color: var(--color-bg);
// }
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