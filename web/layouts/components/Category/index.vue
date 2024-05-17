<script lang="ts" >
export default {
    name: 'Category',
}
</script>
<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from './store';
const appStore = useCategoryStore();
appStore.getCategory();
const router = useRouter();
let options = computed<any>(() => appStore.$state.categoryList);
const cascaderRef = ref<any>(null);
const categoryCode = ref<any>(null);
const onClose = () => {
    // console.log(categoryCode.value, 'categoryCode');
    cascaderRef.value?.clearCheckedNodes();
    if (categoryCode.value) {
        router.push({ name: 'goodsList', query: { categoryCode: categoryCode.value?.join(',') } })
    }
}
onMounted(() => {
    document.addEventListener('click', (e: any) => {
        onClose()
    })
})
onBeforeUnmount(() => {
    categoryCode.value = null
    document.removeEventListener('click', (e: any) => {
        onClose()
    })
})
</script>
<template>
    <div class="category">
        <el-cascader-panel v-model="categoryCode" ref="cascaderRef" style="width: fit-content" :options="options" :props="{children: 'childCategory', label: 'categoryName', value: 'categoryCode', expandTrigger: 'hover'}" />
    </div>
</template>

<style lang="scss">
.category {
    width: 1200px;
    height: 560px;
    background-color: rgba(255, 255, 255, 0.6);
    &.fixed {
        width: auto;
        position: absolute;
        top: 42px;
        left: 0;
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.6);
        .el-cascader-node__label {
            color: var(--color-white);
        }
        .el-cascader-panel.is-bordered {
            border-radius: 0;
            border-top: 0;
            border-bottom: 0;
        }
        .el-cascader-node:not(.is-disabled):hover, .el-cascader-node:not(.is-disabled):focus{
            background-color: rgba(0, 0, 0, 0.3);
            .el-cascader-node__postfix {
                color: var(--color-primary);
            }
        }
        .el-cascader-node__postfix {
            color: var(--color-white);
        }
        .el-cascader-node.in-active-path, .el-cascader-node.is-selectable.in-checked-path, .el-cascader-node.is-active {
            font-weight: normal;
        }
    }
    .el-cascader-panel {
        height: 100%;
        .el-cascader-menu__wrap.el-scrollbar__wrap {
            height: 100%;
        }
    }
}
</style>
