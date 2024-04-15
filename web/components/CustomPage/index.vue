<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import Swiper from './coms/Swiper.vue'
import NavImg from './coms/NavImg.vue'
import Tabs from './coms/Tabs.vue'

defineProps<{ data: { websitePcModuleList: any } }>()

const count = ref(0)
const moduleTypeEnum = ref({
    1001: markRaw(Swiper),
    1002: markRaw(NavImg),
    // 1003: markRaw(Swiper),
    // 1004: markRaw(Swiper),
    // 1005: markRaw(Swiper),
    1006: markRaw(Tabs),
})
</script>

<template>
    <div class="module-list" v-for="item in data.websitePcModuleList" :key="item.pageId">
        <div class="module-list-item" :style="{'margin': item.moduleType === 1001?0:''}" v-for="val in item.websitePcAssemblyList" :key="val.pageIdmoduleName">
            <component :is="moduleTypeEnum[item.moduleType]" :data="val" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.module-list {
    &-item {
        min-width: 1200px;
      margin: 10px auto;
    }
}
</style>
