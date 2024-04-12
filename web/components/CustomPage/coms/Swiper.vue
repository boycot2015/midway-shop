<script setup lang="ts">
import { computed } from 'vue'
import { Props, AssemblyContentProps } from './data'
const props = defineProps<{ data: Props }>()

const assemblyContent = computed<AssemblyContentProps>(() => JSON.parse(props.data.assemblyContent))
const groupList = assemblyContent.value.groupList
</script>
<template>
    <el-carousel :interval="5000" arrow="always" height="560px">
        <el-carousel-item v-for="item in groupList" :key="item.title">
            <el-image style="height: 100%;width: 100%;" @click="item.linkUrl && $router.push(item.linkUrl)" :src="item.pictureUrl">{{ item }}</el-image>
        </el-carousel-item>
    </el-carousel>
</template>
<script lang="ts">
export default {
    name: 'Swiper',
}
</script>