<script lang="ts" >
import { defineComponent, computed } from 'vue'
import { useAppStore } from "@/store/app";
export default defineComponent({
  name: 'CustomPage',
  async asyncData({store, route, router, ctx}) {
    const query = route.query || {};
    const dataStore = useAppStore(store);
    await dataStore.getWebsiteDecoration({ ...query, pageType: 1000 });
  },
  seo({store}) {
   const dataStore = useAppStore(store);
   return {
      title: '首页',
   }
  }
})
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import CustomPage from "@/components/CustomPage/index.vue";

const dataStore = useAppStore();
const data = computed<any>(()=> dataStore.$state.websiteCustomPage)
</script>
<template>
  <div class="home">
    <CustomPage :data="data"></CustomPage>
  </div>
</template>
<style lang="scss" scoped>
.fixed-nav {
    width: 100%;
}
</style>