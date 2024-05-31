<template>
    <div class="order-list" style="width: 100%;">
        <el-tabs v-model="orderStatus" @tab-click="onTabClick">
            <el-tab-pane v-for="tab in tabs.filter(el => !el.hidden)" :key="tab.value" :name="tab.value" :label="tab.title"></el-tab-pane>
        </el-tabs>
        <el-form class="search-area">
            <el-form-item><el-input placeholder="请输入关键词" icon="search" v-model="searchKey" clearable @clear="onTabClick">
                <template #append> <el-icon style="cursor: pointer;" @click="onTabClick" ><Search /></el-icon></template>
            </el-input></el-form-item>
        </el-form>
        <Table
        :loading="loading"
        :data="store.list"
        :spanMethod="objectSpanMethod"
        style="width: 100%;min-height: 400px;margin-bottom: 10px;"
        stripe
        ref="tableRef"
        row-key="orderId"
        :columns="columns"
        :pagination="{
            background: true,
            layout: 'total, sizes, prev, pager, next, jumper, ->',
            pageSizes: [10, 20, 50, 100],
            currentChange:(val) => store.setParams({currentPage: val}),
            sizeChange: (val) => store.setParams({pageSize: val}),
            ...store.pageData
        }"
        :selection="null"
        >
            <template #soOrderCode="{row}">
                {{ row.soOrderCode }}
                <el-link :underline="false" :type="displayOrderStatusType[row.displayOrderStatus]">({{displayOrderStatus[row.displayOrderStatus]}})</el-link>
                <p class="flex flex-center" style="font-size: 12px;" v-if="row.displayOrderStatus===1001">还剩：<el-countdown value-style="color: var(--color-price);font-size: 12px;" format="HH时:mm分:ss秒" :value="new Date(row.createTime).getTime() + 1000 * 60 * 60 * 24" /></p>
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
                <el-link type="primary" v-if="row.displayOrderStatus===1001">取消订单</el-link>
                <el-link type="primary" v-if="row.displayOrderStatus===1005">删除订单</el-link>
                <el-link  type="primary" v-if="row.displayOrderStatus===1004||row.displayOrderStatus===1005" @click="store.buyAgain(row)">再来一单</el-link>
                <el-link type="primary" @click="$router.push({path:'/userCenter/order/detail', query:{orderCode:row.orderCode, soOrderCode:row.soOrderCode}})">查看详情</el-link>
            </template>
        </Table>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import {
    useDataStore,
    tabs,
    displayOrderStatus,
    displayOrderStatusType,
    packageStatus
} from './store';
import Table from '@/components/Table/index.vue';
import { Search } from '@element-plus/icons-vue';
const dataStore = useDataStore();
export default defineComponent({
//   async asyncData({store, route, router, ctx}) {
//     const query = route.query || {};
//     await dataStore.getData({ currentPage: 1, pageSize: 10, displayOrderStatus: query.status || '0' });
//   }
})
</script>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { TableColumnCtx } from 'element-plus'
interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}
const store = useDataStore();
const route = useRoute();
const orderStatus = ref(route.query.status || store.params.displayOrderStatus || '0');
const searchKey = ref('');
const tableRef = ref();
const loading = computed(() => store.loading);

const columns = ref([
    // { label: '全选', width: 40, type: 'selection', 'reserve-selection': true, prop: 'index', fixed: 'left' },
    { label: '订单号', minWidth: 160, prop: 'soOrderCode', slot: true },
    { label: '包裹号', minWidth: 120, prop: 'packageCode', slot: true },
    { label: '商品', minWidth: 240, prop: 'sku', slot: true },
    { label: '订单总额', minWidth: 150, align: 'left', prop: 'amount', 'class-name': 'bold', slot: true },
    { label: '收货人', minWidth: 100, align: 'left', prop: 'receiveName' },
    { label: '状态', minWidth: 80, align: 'left', prop: 'displayOrderStatus', slot: true },
    { label: '操作', fixed: 'right', width: 80, align: 'left', prop: 'operate', slot: true },
])

const selection = ref({
    checkAll: false,
    showCheckAll: true,
    selectedRows: []
})

const onTabClick = () => {
    nextTick(async () => {
        store.setParams({ currentPage: 1, displayOrderStatus: orderStatus.value, search: searchKey.value || undefined });
        // selection.value.checkAll = false;
        // selection.value.selectedRows = [];
        tableRef.value.onCheckAllChange(false);
    })
}
onMounted(async () => {
    store.params.displayOrderStatus = orderStatus.value;
    await dataStore.getData();
})
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
    if (columnIndex !==2 && columnIndex !== 0) {
        if (row.spanIndex % row.childRows === 0) {
            return {
                rowspan: row.childRows,
                colspan: 1,
            }
        }
        return {
            rowspan: 0,
            colspan: 0,
        }
    }
    if (columnIndex === 0) {
        if (row.topSpanIndex % row.topRows === 0) {
            return {
                rowspan: row.topRows,
                colspan: 1,
            }
        }
        return {
            rowspan: 0,
            colspan: 0,
        }
    }
}
</script>

<style lang="scss" scoped>
.order-list {
    padding: 10px 20px;
    position: relative;
    background-color: var(--color-white);
    .search-area {
        position: absolute;
        top: 10px;
        right: 20px;
    }
}
</style>