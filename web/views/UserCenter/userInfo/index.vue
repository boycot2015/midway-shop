<template>
    <div class="user-info">
        <Header></Header>
        <OrderCount></OrderCount>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import request from '@/utils/request';
import Header from './coms/Header.vue';
import OrderCount from './coms/OrderCount.vue';

function getInfo (data: any = {}): Promise<any> {
  return request({
    url: '/api/member/basicinfo',
    method: 'get',
    data,
  });
}
const userStore = useUserStore();
onMounted(() => {
    getInfo().then((res: any) => {
        if (res && res.success) {
            userStore.setUserInfo(res.data);
        }
    })
})
</script>
<style lang="scss" scoped>
// .user-info {
// }
</style>