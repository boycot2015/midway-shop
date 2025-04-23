<template>
  <router-view v-slot="{ Component }">
    <el-config-provider :locale="locale">
      <transition name="fade" mode="in-out">
        <component :is="Component" />
      </transition>
    </el-config-provider>
  </router-view>
</template>
<script lang="ts" setup>
import { provide, computed, ref } from 'vue';
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const language = ref('zh-cn'); // 默认中文
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0,
});
provide(ZINDEX_INJECTION_KEY, {
  current: 10,
});
</script>
