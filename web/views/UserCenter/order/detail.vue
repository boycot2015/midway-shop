<template>
    <div v-loading="loading" class="order-detail tl">
        <div class="order-detail-section">
            <el-descriptions title="订单信息" class="mb20">
                <el-descriptions-item label="订单编号：">{{orderDetail.soOrderCode}}</el-descriptions-item>
                <el-descriptions-item label="订单状态："><el-tag :type="displayOrderStatusType[orderDetail.orderStatus]">{{ displayOrderStatus[orderDetail.displayOrderStatus] || '--' }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="下单时间：">{{orderDetail.createTime}}</el-descriptions-item>
            </el-descriptions>
            <el-steps align-center :active="currentStep">
                <el-step :title="item.nodeMsg" :active="item.node" :description="item.nodeTime" v-for="item in orderDetail.orderNodeList"></el-step>
            </el-steps>
        </div>
        <div class="order-detail-section">
            <el-descriptions title="客户信息">
                <el-descriptions-item label="收件人：">{{orderDetail.receiveName}}</el-descriptions-item>
                <el-descriptions-item label="手机号码：">{{orderDetail.receiveMobile}}</el-descriptions-item>
                <el-descriptions-item label="收件地址：">{{orderDetail.address}}</el-descriptions-item>
                <el-descriptions-item label="留言：">{{orderDetail.buyerMsg}}</el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="order-detail-section">
            <el-descriptions title="商品信息">
                <el-descriptions-item :span="3">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="全部" name="0"></el-tab-pane>
                    </el-tabs>    
                </el-descriptions-item>
                <el-descriptions-item label="">
                    <!-- :spanMethod="objectSpanMethod" -->
                    <Table
                    :loading="loading"
                    :data="store.list"
                    style="width: 100%;min-height: 400px;margin-bottom: 10px;"
                    stripe
                    ref="tableRef"
                    row-key="orderId"
                    :columns="columns"
                    >
                        <template #soOrderCode="{row}">
                            {{ row.soOrderCode }}
                            <el-link :underline="false" :type="displayOrderStatusType[row.displayOrderStatus]">({{displayOrderStatus[row.displayOrderStatus]}})</el-link>
                        </template>
                        <template #sku="{row}">
                            <div class="sku-box flex">
                                <div class="img">
                                    <el-image style="width: 64px;height: 64px;" :src="row.orderGoods.goodsImageUrl"></el-image>
                                </div>
                                <div class="text ml20">
                                    <p class="name line-clamp2" :title="row.orderGoods.goodsName">{{ row.orderGoods.goodsName }}</p>
                                    <span class="color-name" v-if="row.orderGoods.specColorName">{{ row.orderGoods.specColorName}}：</span>
                                    <span class="color-value">{{ row.orderGoods.specColorValue}}</span>
                                </div>
                            </div>
                        </template>
                        <template #packageCode="{row}">
                            <span v-if="row.package">
                                包裹 {{ (row.packageIndex || 0) + 1 }}
                                {{ row.package.packageCode }}
                            </span>
                        </template>
                        <template #amount="{row}">
                            <span v-if="row.displayOrderStatus > 1001 && row.package?.packageTotalAmount">
                                {{ row.package.packageTotalAmount }}<span >{{ row.integralUnit || '积分' }}</span>
                            </span>
                            <span v-else-if="row.orderTotalAmount">{{ row.orderTotalAmount }}<span >{{ row.integralUnit || '积分' }}</span></span>
                            <span v-if="row.displayOrderStatus > 1001 && row.package?.packageTotalAmount">+￥{{ row.package.packageTotalAmount }}</span>
                            <span v-else-if="row.totalPayCashAmount">+￥{{ row.totalPayCashAmount || 0 }}</span>
                        </template>
                        <template #displayOrderStatus="{row}">
                            <!-- {{ row.package && row.package.packageStatus }} -->
                            <el-link v-if="row.package && packageStatus[row.package.packageStatus]" :type="packageStatus[row.package.packageStatus].type">{{packageStatus[row.package.packageStatus].title}}</el-link>
                            <el-link v-else :type="displayOrderStatusType[row.displayOrderStatus]">{{displayOrderStatus[row.displayOrderStatus]}}</el-link>
                        </template>
                        <template #operate="{row}">
                            <template v-if="row.displayOrderStatus===1003||row.displayOrderStatus===2010">
                                <el-link type="primary">确认收货</el-link>
                                <el-link type="primary">查看物流</el-link>
                            </template>
                            <el-link type="primary" v-if="row.displayOrderStatus===1001" @click="$router.push('/order/pay?orderCode='+row.orderCode)">去支付</el-link>
                            <el-link type="danger" v-if="row.displayOrderStatus===1001">取消订单</el-link>
                            <el-link type="danger" v-if="row.displayOrderStatus===1005">删除订单</el-link>
                            <el-link  type="primary" v-if="row.displayOrderStatus===1004||row.displayOrderStatus===1005">再来一单</el-link>
                            <el-link type="primary" @click="$router.push({path:'/userCenter/order/detail', query:{orderCode:row.orderCode, soOrderCode:row.soOrderCode}})">查看详情</el-link>
                        </template>
                    </Table>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Table from '@/components/Table/index.vue';
import {
    useDataStore,
    tabs,
    displayOrderStatus,
    displayOrderStatusType,
    packageStatus
} from './store';
const store = useDataStore();
const orderDetail = computed(() => store.detail);
const loading = computed(() => store.loading);
const currentStep = computed(() => store.detail.orderNodeList?.findIndex(el => !el.nodeTime) || 0);
const activeTab = ref('0');
const columns = ref([
    { label: '订单号', minWidth: 120, prop: 'soOrderCode', slot: true },
    { label: '包裹号', minWidth: 120, prop: 'packageCode', slot: true },
    { label: '商品', minWidth: 240, prop: 'sku', slot: true },
    { label: '订单总额', minWidth: 150, align: 'left', prop: 'amount', 'class-name': 'bold', slot: true },
    { label: '收货人', minWidth: 100, align: 'left', prop: 'receiveName' },
    { label: '状态', minWidth: 100, align: 'left', prop: 'displayOrderStatus', slot: true },
    { label: '操作', fixed: 'right', width: 80, align: 'left', prop: 'operate', slot: true },
])
const route = useRoute();
store.getDetailData({ orderCode: route.query.orderCode as string, soOrderCode: route.query.soOrderCode as string });
</script>

<style lang="scss" scoped>
.order-detail-section {
    background-color: var(--color-white);
    padding: 20px;
    margin-bottom: 20px;
}
</style>