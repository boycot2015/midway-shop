<template>
    <div class="goods">
        <el-descriptions title="商品信息" :column="1">
            <el-descriptions-item>
                <Table
                class="goods-table"
                ref="tableRef"
                :data="data"
                :columns="columns"
                >
                    <template #name="{row}">
                        <GoodsItem
                        layout="horizontal"
                        szie="small"
                        :border="false"
                        :skuName="row.goodsSkuName"
                        :goodsSkuCode="row.goodsSkuCode"
                        :imgUrl="row.imgUrl"
                        v-bind={row}>
                        <template #goodsSpec>
                            <div class="ellipsis" v-if="row.skuSpecOutputVOList" :title="row.skuSpecOutputVOList.map(el => el.specName + ':'+el.specValue).join(' ')">
                                <span v-for="item in row.skuSpecOutputVOList" :key="item.id">{{ item.specName }}:{{ item.specValue }}</span>
                            </div>
                        </template>
                        <template #goodsPrice><span></span></template>
                    </GoodsItem>
                    </template>
                    <template #price="{row}">
                        <span>{{ row.integralPrice }}{{ store.integralUnit }}</span>
                    </template>
                    <template #num="{row}">
                        <!-- <el-input-number v-model="row.num" :min="row.minimumOrderQuantity" :max="999" @change="cartStore.updateCart(row)"></el-input-number> -->
                        {{ row.num }}
                        <span style="margin-left: 5px;">{{ row.goodsUnit }}</span>
                    </template>
                    <template #amount="{row}">
                        {{ row.integralPrice * row.num }}{{ store.integralUnit }}
                    </template>
                    <!-- <template #operate="{row}">
                        <el-link type="danger" class="mr10">删除</el-link>
                        <el-link type="danger">移入收藏夹</el-link>
                    </template> -->
                </Table>
            </el-descriptions-item>
            <el-descriptions-item align="right">
                共 <span class="color-price">{{ data.reduce((p, n) => p + n.num, 0) }}</span> 件商品 商品总额： <span class="color-price">{{ data.reduce((p, n) => p + (n.integralPrice * n.num), 0) }} {{ store.integralUnit }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
    name: 'goodsList'
})
</script>
<script setup lang="ts">
import { useDataStore } from '../store';
import GoodsItem from '@/components/GoodsItem/index.vue';
import Table from '@/components/Table/index.vue';
const store = useDataStore();
const data = computed(() => store.goodsList)
const columns = ref([
    // { label: '全选', type: 'selection' },
    { label: '商品名称', prop: 'name', width: 500, slot: true },
    { label: '单价', prop: 'price', 'class-name': 'bold', slot: true },
    { label: '数量', prop: 'num', slot: true },
    { label: '小计', prop: 'amount', 'class-name': 'bold', slot: true },
    // { label: '操作', prop: 'operate', slot: true },
])
</script>
<style lang="scss" scoped>
.goods {
    width: 100%;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 20px;
    &-table {
        width: 100%;
    }
}
</style>