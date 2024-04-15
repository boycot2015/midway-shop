<template>
  <router-view  v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script lang="ts" setup>
import { provide } from 'vue'
    import { ID_INJECTION_KEY } from 'element-plus'
    provide(ID_INJECTION_KEY, {
      prefix: 100,
      current: 0,
    })
</script>
