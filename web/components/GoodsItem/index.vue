<script lang="ts">
import { GoodsItemProps } from "./data.d";
</script>
<script lang="ts" setup>
// 读取数据
// const props = defineProps<GoodsItemProps>();
const props = withDefaults(defineProps<GoodsItemProps>(), {
    border: true,
    layout: 'vertical',
})
</script>
<template>
  <div class="goods-list-item" :class="{[props.size]:props.size, 'horizontal': props.layout==='horizontal', 'border': props.border}" :key="props.goodsCode" @click="props.goodsCode && $router.push(`/goodsDetail/goodsDetail?goodsSkuCode=${props.goodsSkuCode}&goodsCode=${props.goodsCode}`)">
        <div class="goods-list-item-img">
            <el-image :src="props.imgUrl"></el-image>
        </div>
        <div class="goods-list-item-text">
            <slot name="goodsName">
                <div class="goods-list-item-name line-clamp2" :calss="props.ellipsis" :title="props.goodsName || props.skuName" v-html="props.goodsName || props.skuName"></div>
            </slot>
            <slot name="goodsSpec"></slot>
            <slot name="goodsPrice">
                <div class="goods-list-item-price">
                    <span class="goods-list-item-price-text">
                        {{ props.integralPrice }}
                    </span>
                    <span class="goods-list-item-unit">{{ props.integralUnit || '积分' }}</span>
                </div>
            </slot>
            <slot name="action"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.goods-list-item {
    &.horizontal {
        display: flex;
        height: 68px;
        padding: 0;
        margin-bottom: 0;
        background-color: transparent;
        .goods-list-item-img {
            width: 68px;
            height: 68px;
            margin: 0;
            margin-right: 16px;
        }
        .goods-list-item-name {
            margin-bottom: 0;
        }
    }
    padding: 16px;
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 16px;
    background-color: var(--color-white);
    &.border {
        border: 1px solid var(--color-border);
    }
    cursor: pointer;
    &:nth-child(5n) {
        margin-right: 0;
    }
    &-img {
        width: 192px;
        height: 192px;
        margin: auto;
        margin-bottom: 10px;
    }
    &-text {
        text-align: left;
        width: 192px;
    }
    &-name {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 22px;
        height: 44px;
        color: var(--color-font1);
    }
    &-price-text {
        color: var(--color-price);
        font-size: 16px;
    }
    &-unit {
        margin-left: 5px;
        font-size: 14px;
        color: var(--color-font2);
    }
}
</style>