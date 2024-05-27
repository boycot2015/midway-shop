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
        :selection="selection"
        >
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
                <el-link :type="displayOrderStatusType[row.displayOrderStatus]">{{displayOrderStatus[row.displayOrderStatus]}}</el-link>
            </template>
            <template #operate="{row}">
                 <template v-if="row.displayOrderStatus===1003||row.displayOrderStatus===2010">
                    <el-link type="primary">确认收货</el-link>
                    <el-link type="primary">查看物流</el-link>
                 </template>
                 <el-link type="danger" v-if="row.displayOrderStatus===1001" @click="$router.push('/order/pay?orderCode='+row.orderCode)">去支付</el-link>
                <el-link type="info" v-if="row.displayOrderStatus===1001">取消订单</el-link>
                <el-link type="danger" v-if="row.displayOrderStatus===1005">删除订单</el-link>
                <el-link  type="primary" v-if="row.displayOrderStatus===1004||row.displayOrderStatus===1005">再来一单</el-link>
                <el-link type="primary" @click="$router.push('/userCenter/order/detail?orderCode='+row.orderCode)">查看详情</el-link>
            </template>
        </Table>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useDataStore } from './store';
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
const loading = computed(() => store.loading);
const tabs = ref([
    { title: '全部订单', value: '0', type: '' },
    { title: '待支付', value: '1001', type: 'danger' },
    { title: '待发货', value: '1002', type: 'warning' },
    { title: '待发货', value: '1007', type: 'warning', hidden: true },
    { title: '部分发货', value: '2010', type: 'primary', hidden: true },
    { title: '已取消', value: '1005', type: 'info', hidden: true },
    { title: '待核销', value: '1012', type: 'primary', hidden: true },
    { title: '已发货', value: '1003', type: 'primary' },
    { title: '已完成', value: '1004', type: 'success' },
]);
const columns = ref([
    { label: '全选', width: 40, type: 'selection', 'reserve-selection': true, prop: 'index', fixed: 'left' },
    { label: '订单号', minWidth: 120, prop: 'soOrderCode' },
    { label: '包裹号', minWidth: 120, prop: 'packageCode', slot: true },
    { label: '商品', minWidth: 240, prop: 'sku', slot: true },
    { label: '订单总额', minWidth: 150, align: 'left', prop: 'amount', slot: true },
    { label: '收货人', minWidth: 100, align: 'left', prop: 'receiveName' },
    { label: '状态', minWidth: 100, align: 'left', prop: 'displayOrderStatus', slot: true },
    { label: '操作', fixed: 'right', width: 80, align: 'left', prop: 'operate', slot: true },
])
const displayOrderStatus = ref({});
const displayOrderStatusType = ref({});

const selection = ref({
    checkAll: false,
    showCheckAll: true,
    selectedRows: []
})
tabs.value.filter(el => !!+el.value).map(el => {
    displayOrderStatus.value[el.value] = el.title
    displayOrderStatusType.value[el.value] = el.type
})
const onTabClick = () => {
    nextTick(async () => {
        store.setParams({ currentPage: 1, displayOrderStatus: orderStatus.value, search: searchKey.value || undefined });
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
    if (columnIndex !==3 && columnIndex !== 1) {
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
    if (columnIndex === 1) {
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