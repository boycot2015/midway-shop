<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useDataStore } from "./store";
import { GoodsList, GoodsParams } from "./data.d";
import GoodsItem from '@/components/GoodsItem/index.vue';
export default defineComponent({
  async asyncData({store, route, router, ctx}) {
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
const list = computed<GoodsList[]>(()=> dataStore.$state.goodsList)
</script>
<template>
  <div class="goods-list w1200">
    <GoodsItem v-bind="{...item}" v-for="item in list" :key="item.goodsSkuCode">
    </GoodsItem>
  </div>
</template>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
}
</style>