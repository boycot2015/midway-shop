<script lang="ts">
import { defineComponent, computed, ref, reactive, nextTick } from 'vue'
import { useDetailStore } from './store';
import { GoodsDetail, Sku, RateData } from './data.d';
import { useRoute, useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'

export default defineComponent({
  async asyncData({store, route, router, ctx}) {
    const query = route.query || {};
    const id = query.goodsCode?.toString() || '';
    const detailStore = useDetailStore(store);
    await detailStore.getDetail(id);
    await detailStore.getRateData({ goodsCode: id, currentPage: 1, pageSize: 20 });
  },
  seo({store}) {
   const detailStore = useDetailStore(store);
   return {
      title: detailStore.goodsData.goodsTitle + '-详情测试',
   }
  }
})
</script>
<script lang="ts" setup>
import SkuCom from './coms/sku.vue'
import DescCom from './coms/desc.vue'
</script>
<template>
  <div class="detail">
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


