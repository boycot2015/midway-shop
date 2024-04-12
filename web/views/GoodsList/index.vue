<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useDataStore } from "./store";
import { GoodsList, GoodsParams } from "./data.d";
export default defineComponent({
  async asyncData({store, route, router, ctx}) {
    // console.log('router, ctx', router, ctx);
    const query = route.query || {};
    const dataStore = useDataStore(store);
    await dataStore.getData({ currentPage: 1, ...query } as GoodsParams);
  },
  seo({store}) {
   const dataStore = useDataStore(store);
   return {
      title: '商品列表',
   }
  }
})
</script>
<script lang="ts" setup>
// 读取数据
const dataStore = useDataStore();
const list = computed<GoodsList>(()=> dataStore.$state.goodsList)
</script>
<template>
  <div class="goods-list w1200">
    <div class="goods-list-item" v-for="item in list" :key="item.goodsSkuCode">
        <div class="img">
            <el-image :src="item.imgUrl"></el-image>
        </div>
        <div class="text">
            <div class="name" v-html="item.goodsName || item.skuName"></div>
            <div class="price">
                <span class="price-text">
                    {{ item.integralPrice }}
                </span>
                <span class="unit">{{ item.integralUnit || '积分' }}</span>
            </div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    &-item {
        padding: 16px;
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 16px;
        border: 1px solid var(--color-border);
        &:nth-child(5n) {
            margin-right: 0;
        }
        .img {
            width: 180px;
            height: 180px;
            margin: auto;
            margin-bottom: 10px;
        }
        .name {
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 22px;
            max-width: 180px;
            color: var(--color-font1);
        }
        .price-text {
            color: var(--color-price);
            font-size: 16px;
        }
        .unit {
            margin-left: 5px;
            font-size: 14px;
            color: var(--color-font2);
        }
    }
}
</style>