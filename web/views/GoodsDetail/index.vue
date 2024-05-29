<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useDetailStore } from './store';
// import { GoodsDetail, RateData } from './data.d';
import { useRoute, useRouter } from 'vue-router';
// import { ArrowDown } from '@element-plus/icons-vue'
import { Sku } from '@/@types/goods.d';

// const detailStore = useDetailStore();
export default defineComponent({
    name: 'GoodsDetail',
  async asyncData({store, route, router, ctx}) {
    const query = route.query || {};
    const id = query.goodsCode?.toString() || '';
    const detailStore = useDetailStore(store);
    await detailStore.getDetail(id);
  },
  seo({ store, route }) {
    const detailStore = useDetailStore(store);
    let currentSku = ref(detailStore.goodsData.goodsSkuList?.find(item => item.goodsSkuCode === route.query.goodsSkuCode) || {} as Sku);
   return {
      title: currentSku.value.goodsSkuTitle || '商品详情',
   }
  }
})
</script>
<script lang="ts" setup>
import SkuCom from './coms/sku.vue'
import DescCom from './coms/desc.vue'
const route = useRoute();
const query = route.query || {};
const id = query.goodsCode?.toString() || '';
const detailStore = useDetailStore();
let loading = computed(() => detailStore.loading);
// detailStore.getRateData({ goodsCode: id, currentPage: 1, pageSize: 20 });
</script>
<template>
  <div class="detail" v-loading="loading">
    <div class="w1200">
        <SkuCom></SkuCom>
        <DescCom></DescCom>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail {
    padding-top: 20px;
    text-align: left;
    background-color: var(--color-white);
}
</style>


