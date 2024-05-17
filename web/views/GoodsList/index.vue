<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
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
import { useRoute } from 'vue-router'
const route = useRoute();
// 读取数据
const dataStore = useDataStore();
watch(route, (val) => {
    dataStore.getData({ currentPage: 1, ...val.query } as GoodsParams)
})
const loading = computed(() => dataStore.loading)
const pageData = computed(() => dataStore.pageData)
const noMore = computed(() => pageData.value.currentPage >= pageData.value.totalPage)
const list = computed(()=> dataStore.$state.goodsList);
const load = async () => {
    if (pageData.value.totalPage <= 2) return
    pageData.value.currentPage += 1;
    dataStore.getData({ ...pageData.value, ...route.query } as GoodsParams)
}
</script>
<template>
    <div class="goods-list-container" v-infinite-scroll="load">
        <div class="goods-list w1200">
          <GoodsItem v-bind="{...item}" v-for="item in list" :key="item.goodsSkuCode">
          </GoodsItem>
      </div>
      <div class="tc flex-1" v-if="list.length > 20" style="width: 100%;">
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">到底了~</p>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
}
</style>