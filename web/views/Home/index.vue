<script lang="ts" >
import { defineComponent, computed } from 'vue'
import { useDataStore } from "./store";
export default defineComponent({
  async asyncData({store, route, router, ctx}) {
    const query = route.query || {};
    const dataStore = useDataStore(store);
    await dataStore.getWebsiteConfig();
  },
  seo({store}) {
   const dataStore = useDataStore(store);
   return {
      title: '首页',
   }
  }
})
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CustomPage from "@/components/CustomPage/index.vue";
import type { TabsPaneContext } from 'element-plus';

const dataStore = useDataStore();
const data = computed<any>(()=> dataStore.$state.websitePage)
const websitePcFixedList = data.value.websitePcFixedList.map(el => {
    el.fixedContent = el.fixedContent && typeof el.fixedContent === 'string' ? JSON.parse(el.fixedContent) : el.fixedContent
    el.columnName = 'home'
    return el
})
const columnName = ref('home');
const router = useRouter();
const handleClick = (tab: TabsPaneContext, event: Event, navLinkList) => {
    if (tab.paneName) {
        router.push(tab.paneName as  string);
    }
}
</script>
<template>
  <div class="home">
    <div class="fixed-list w1200" v-for="item in websitePcFixedList" :key="item.columnName">
        <el-tabs v-model="columnName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="home"></el-tab-pane>
            <el-tab-pane v-for="val in item.fixedContent.navLinkList" :label="val.columnName" :name="val.columnLink" :key="val.columnName"></el-tab-pane>
        </el-tabs>
    </div>
    <CustomPage :data="data"></CustomPage>
  </div>
</template>
<style lang="scss" scoped>
</style>


./store