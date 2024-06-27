<template>
    <div class="submit-order">
        <Header></Header>
        <div class="submit-order-nav">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="w1200 submit-order-content" v-loading="dataStore.loading">
            <router-view></router-view>
        </div>
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
import { defineComponent } from 'vue';
import { useUserStore } from '@/store/user';
import { useDataStore } from './store';
import Header from './coms/Header.vue';
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue';
const userStore = useUserStore();
const dataStore = useDataStore();
</script>
<style lang="scss" scoped>
.submit-order {
    &-nav {
        margin-top: 20px;
    }
    &-content {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--color-white);
    }
}
</style>