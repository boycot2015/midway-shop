<template>
    <div class="submit-order-main">
        <Address></Address>
        <GoodsList></GoodsList>
        <Pay></Pay>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: 'SubmitOrder',
    // async asyncData({store, route, router, ctx}) {
    //     // const query = route.query || {};
    // }
})
</script>
<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDataStore } from './store';
import Address from './coms/Address.vue';
import GoodsList from './coms/GoodsList.vue';
import Pay from './coms/Pay.vue';

const route = useRoute();
const dataStore = useDataStore();
onMounted(() => {
    dataStore.getData(route.query.goodsSkuCode as string);
})
</script>
<style lang="scss" scoped>
// .user-main-right {
//     background-color: var(--color-white);
// }
</style>