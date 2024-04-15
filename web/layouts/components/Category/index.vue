<script lang="ts" >
export default {
    name: 'Category',
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { useCategoryStore } from './store';
const appStore = useCategoryStore();
appStore.getCategory();
let options = computed<any>(() => appStore.$state.categoryList);
</script>
<template>
    <div class="category">
        <el-cascader-panel style="width: fit-content" :options="options" :props="{children: 'childCategory', label: 'categoryName', value: 'categoryCode', expandTrigger: 'hover'}" />
    </div>
</template>

<style lang="scss">
.category {
    width: 1200px;
    height: 560px;
    position: absolute;
    top: 40px;
    left: 0;
    .el-cascader-panel {
        height: 100%;
    }
}
</style>
