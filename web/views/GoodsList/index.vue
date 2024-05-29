<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useDataStore } from "./store";
import { useCartStore } from "@/store/cart";
import { GoodsParams } from "./data.d";
import GoodsItem from '@/components/GoodsItem/index.vue';
import { ShoppingCart } from '@element-plus/icons-vue';
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
const cartStore = useCartStore();

watch(route, (val) => {
    dataStore.getData({ currentPage: 1, ...val.query } as GoodsParams)
})
const loading = computed(() => dataStore.loading)
const pageData = computed(() => dataStore.pageData)
const noMore = computed(() => pageData.value.currentPage >= pageData.value.totalPage)
const queryForm = computed(()=> dataStore.$state.query);
const list = computed(()=> dataStore.$state.goodsList);
const load = async () => {
    if (pageData.value.totalPage <= 2) return
    pageData.value.currentPage += 1;
    dataStore.getData({ ...pageData.value, ...route.query } as GoodsParams)
}
const onStockChange = () => {
    pageData.value.currentPage = 1;
    dataStore.getData({ ...pageData.value, ...route.query } as GoodsParams)
}
</script>
<template>
    <div class="goods-list-container" v-infinite-scroll="load">
        <el-form class="search-form w1200" :model="queryForm">
            <el-form-item prop="onlyInStock">
                <el-checkbox label="仅显示有货" v-model="queryForm.onlyInStock" @change="onStockChange"></el-checkbox>
            </el-form-item>
        </el-form>
        <div class="goods-list w1200">
            <template v-if="list && list.length" v-loading="loading">
                <GoodsItem v-bind="item" v-for="item in list" :key="item.goodsSkuCode">
                    <template #action>
                      <div class="flex flex-end">
                          <el-icon size="20" @click.stop="() => cartStore.addCart({quantity: 1, goodsCode: item.goodsCode, goodsSkuCode: item.goodsSkuCode, integralPrice: item.integralPrice || 0})" style="color:var(--color-primary)"><ShoppingCart /></el-icon>
                      </div>
                  </template>
                </GoodsItem>
            </template>
            <template v-else>
                <div class="empty-block flex flex-center tc flex-justify-center">
                    <p>暂无数据~</p>
                </div>
            </template>
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
    .empty-block {
        width: 100%;
        min-height: 200px;
    }
}
</style>