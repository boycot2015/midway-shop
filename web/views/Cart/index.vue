
import { join } from 'path';

<template>
    <div class="cart" v-loading="loading">
        <div class="cart-content w1200">
            <!-- 有效 -->
            <p class="title">购物车列表</p>
            <div class="cart-list">
                <Table
                class="cart-table"
                ref="tableRef"
                v-for="(item, index) in [cartStore.validCartItems, cartStore.invalidCartItems]"
                :data="item"
                :key="index"
                :columns="columns"
                :selection="index === 0 ? selection : null"
                :disabled="index === 1"
                :show-header="index === 0"
                >
                    <template #name="{row}">
                        <GoodsItem
                        layout="horizontal"
                        szie="small"
                        :border="false"
                        :skuName="row.goodsSkuName"
                        :goodsSkuCode="row.goodsSkuCode"
                        :imgUrl="row.goodsSkuImgUrl"
                        v-bind={row}>
                        <template #goodsSpec>
                            <div class="ellipsis" v-if="row.goodsSpecList" :title="row.goodsSpecList.map(el => el.specName + ':'+el.specValue).join(' ')">
                                <span v-for="item in row.goodsSpecList" :key="item.id">{{ item.specName }}:{{ item.specValue }}</span>
                            </div>
                        </template>
                        <template #goodsPrice><span></span></template>
                    </GoodsItem>
                    </template>
                    <template #price="{row}">
                        <span>{{ row.integralPrice }}{{ websiteConfig.websiteUnit }}</span>
                    </template>
                    <template #num="{row}">
                        <el-input-number v-model="row.quantity" :min="row.minimumOrderQuantity" :max="999" @change="cartStore.updateCart(row)"></el-input-number>
                        <span style="margin-left: 5px;">{{ row.goodsUnit }}</span>
                    </template>
                    <template #amount="{row}">
                        {{ row.integralPrice * row.quantity }}{{ websiteConfig.websiteUnit }}
                    </template>
                    <template #operate="{row}">
                        <el-link type="danger" class="mr10">删除</el-link>
                        <el-link type="danger">移入收藏夹</el-link>
                    </template>
                </Table>
            </div>
        </div>
        <div class="settment">
            <div class="w1200 flex flex-justify-between flex-center settment-box">
                <div class="action flex flex-justify-between flex-center">
                    <el-checkbox v-model="selection.checkAll" @change="tableRef[0].onCheckAllChange(selection.checkAll)">全选</el-checkbox>
                    <el-link type="danger" :disabled="!selection.selectedRows.length" class="ml20 mr10">删除选择商品</el-link>
                    <el-link :disabled="!selection.selectedRows.length">移入收藏夹</el-link>
                </div>
                <div class="total flex flex-center">
                    <span>共<span>{{ totalQuantity }}</span>件商品，总计：</span>
                    <span class="mr20 color-price">{{ totalAmount }}{{ websiteConfig.websiteUnit }}</span>
                    <el-button type="danger" :disabled="!totalQuantity" @click="$router.push('/order/submit')">去结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import Table from '@/components/Table/index.vue';
import GoodsItem from '@/components/GoodsItem/index.vue';
import { useCartStore } from '@/store/cart';
import { useAppStore } from '@/store/app';
const cartStore = useCartStore();
const appStore = useAppStore();
const loading = computed(() => cartStore.loading);
const totalAmount = computed(() => cartStore.totalAmount);
const totalQuantity = computed(() => cartStore.totalQuantity);
const websiteConfig = computed(() => appStore.websiteConfig || {}) || {};
const columns = ref([
    { label: '全选', type: 'selection' },
    { label: '商品名称', prop: 'name', width: 300, slot: true },
    { label: '价格', prop: 'price', 'class-name': 'bold', slot: true },
    { label: '数量', prop: 'num', slot: true },
    { label: '小计', prop: 'amount', 'class-name': 'bold', slot: true },
    { label: '操作', prop: 'operate', slot: true },
])
const tableRef = ref();
const selection = ref({
    checkAll: false,
    showCheckAll: false,
    selectedRows: [],
    selectionChange: (selection) => {
        cartStore.setSelectedGoodsList(selection);
    }
})

onMounted(() => {
    cartStore.getCartData();
})
</script>

<style lang="scss" scoped>
.cart {
    position: relative;
    &-content {
        padding: 20px;
        box-sizing: border-box;
        min-width: 1200px;
        background-color: var(--color-white);
        margin-bottom: 20px;
    }
    .title {
        text-align: left;
        margin-bottom: 10px;
    }
    &-list {
        margin-bottom: 20px;
    }
    &-table {
        margin-bottom: 0;
    }
    .settment {
        height: 60px;
        position: sticky;
        width: 100%;
        box-shadow: 0 -15px 15px rgba(255, 255, 255, .6);
        background-color: var(--color-white);
        bottom: 0;
        z-index: 9;
        &-box {
            height: 100%;
            min-width: 1200px;
        }
        .total {
            height: 100%;
        }
    }
}
</style>