<template>
<router-view v-slot="{ Component }">
    <transition name="fade" mode="in-out">
        <component :is="Component" />
    </transition>
</router-view>
</template>
<script lang="ts" setup>
import { provide } from 'vue'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
})
provide(ZINDEX_INJECTION_KEY, {
    current: 10,
})

</script>
