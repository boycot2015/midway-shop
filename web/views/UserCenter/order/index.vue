<template>
    <div style="width: 100%;">
        <el-tabs v-model="orderStatus" @tab-click="onTabClick">
            <el-tab-pane v-for="tab in tabs" :key="tab.value" :name="tab.value" :label="tab.title"></el-tab-pane>
        </el-tabs>
        <el-table v-loading="loading" :data="store.list" style="width: 100%;min-height: 400px;margin-bottom: 20px;" :spanMethod="objectSpanMethod">
            <el-table-column prop="sku" label="商品" width="320">
                <template #default="{row}">
                    <div class="sku-box flex">
                        <div class="img">
                            <el-image style="width: 64px;height: 64px;" :src="row.orderGoods.goodsImageUrl"></el-image>
                        </div>
                        <div class="text ml20">
                            <p class="name line-clamp2" style="max-width: 160px;" :title="row.orderGoods.goodsName">{{ row.orderGoods.goodsName }}</p>
                            <span class="color-name" v-if="row.orderGoods.specColorName">{{ row.orderGoods.specColorName}}：</span>
                            <span class="color-value">{{ row.orderGoods.specColorValue}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="订单总额" width="180" >
                <template #default="{row}">
                    <span v-if="row.displayOrderStatus > 1001">{{ row.package?.packageTotalAmount }}</span>
                    <span v-else>{{ row.totalPayIntegralAmount }}</span>
                    <span >{{ row.integralUnit || '积分' }}</span>
                    <span v-if="row.displayOrderStatus > 1001 && row.package?.packageTotalAmount">+￥{{ row.package?.packageTotalAmount }}</span>
                    <span v-else-if="row.totalPayCashAmount">+￥{{ row.totalPayCashAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="receiveName" label="收货人" />
            <el-table-column prop="displayOrderStatus" label="状态" width="180" >
                <template #default="{row}">
                    {{displayOrderStatus[row.displayOrderStatus]}}
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="180" >
                <template #default="{row}">
                    {{row.displayOrderStatus}}
                </template>
            </el-table-column>
        </el-table>
        <div class="clearfix">
            <el-pagination
            class="fr"
            v-model:current-page="pageData.currentPage"
            v-model::page-size="pageData.pageSize"
            :page-sizes="[10, 20, 30, 50]"
            :background="true"
            :default-page-size="20"
            layout="total, prev, pager, next, jumper, ->"
            :total="pageData.totalRow"
            @current-change="(val) => store.setPageData(val, 'currentPage')"
            @size-change="(val) => store.setPageData(val, 'pageSize')" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useDataStore } from './store';

const dataStore = useDataStore();
export default defineComponent({
//   async asyncData({store, route, router, ctx}) {
//     const query = route.query || {};
//     await dataStore.getData({ currentPage: 1, pageSize: 20, displayOrderStatus: query.status || '0' });
//   }
})
</script>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { TableColumnCtx } from 'element-plus'
interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}
const route = useRoute();
const orderStatus = ref(route.query.status || '0');
const store = useDataStore();
const loading = computed(() => store.loading);
const pageData = computed(() => store.pageData);
const tabs = ref([
    { title: '全部订单', value: '0' },
    { title: '待支付', value: '1001' },
    { title: '待发货', value: '1002' },
    { title: '已发货', value: '1003' },
    { title: '已完成', value: '1004' },
]);
const displayOrderStatus = ref({});
tabs.value.filter(el => !!+el.value).map(el => {
    displayOrderStatus.value[el.value] = el.title
})
const onTabClick = () => {
    nextTick(() => {
        store.getData({ displayOrderStatus: orderStatus.value })
    })
}
onMounted(() => {
    dataStore.getData({ currentPage: 1, pageSize: 20, displayOrderStatus: route.query.status || '0' });
})
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
    if (columnIndex === 0) {
        console.log(row.spanIndex+1, row.totalRows, 'row.spanIndex');
        if (row.spanIndex % row.totalRows === 0) {
            return {
                rowspan: row.totalRows,
                colspan: 1,
            }
        }
        return {
            rowspan: 0,
            colspan: 0,
        }
    }
    return {
        rowspan: 1,
        colspan: 1,
    }
}
</script>

<style scoped>

</style>