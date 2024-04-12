<script setup lang="ts">
import { computed } from 'vue'
import { Props, AssemblyContentProps } from './data'
const props = defineProps<{ data: Props }>()

const assemblyContent = computed<AssemblyContentProps>(() => JSON.parse(props.data.assemblyContent))
const groupList = assemblyContent.value.groupList
</script>
<template>
    <div class="nav-img-list w1200">
        <div class="nav-img-list-item" v-for="(item, index) in groupList" :key="index">
            <el-image style="height: 100%;width: 100%;" @click="item.linkUrl && $router.push(item.linkUrl)" :src="item.pictureUrl">{{ item }}</el-image>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Swiper',
}
</script>
<style lang="scss" scoped>
.nav-img-list {
    display: flex;
    &-item {
        flex: 1;
        padding-right: 10px;
        &:last-child {
            padding-right: 0;
        }
    }
}
</style>