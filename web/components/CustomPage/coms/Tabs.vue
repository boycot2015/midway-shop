<script lang="ts">
export default {
    name: 'Tabs'
}
</script>
<script setup lang="ts">
import { useDataStore } from "./store";
import GoodsItem from '../../GoodsItem/index.vue';
import { computed, ref } from 'vue';
import { Props, AssemblyContentProps, List } from './data';
import type { TabsPaneContext } from 'element-plus';
const props = defineProps<{ data: Props }>();
const assemblyContent = computed<AssemblyContentProps>(() => JSON.parse(props.data.assemblyContent));
const groupList = ref(assemblyContent.value?.groupList || []);
const dataStore = useDataStore();
Promise.all(groupList.value.map(async (el:List) => {
    if (el.goodsSkuCodeList && el.goodsSkuCodeList.length) {
        el.goodsList = await dataStore.getData({ goodsSkuCodeList: el.goodsSkuCodeList || [] })
    }
    return el
}));
const activeName = ref(groupList.value[0]?.title || '');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>
<template>
    <div class="w1200">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in groupList" :name="item.title" :key="item.title" :label="item.title">
                <div class="goods-list">
                    <template v-if="item.goodsList && item.goodsList.length">
                        <GoodsItem v-bind="{...val}" v-for="val in item.goodsList" :key="item.title"></GoodsItem>
                    </template>
                    <div style="width: 100%;" v-else>
                        <el-empty :image-size="200" description="暂无数据~" />
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
}
</style>