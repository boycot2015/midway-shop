<template>
    <div class="pay">
        <el-descriptions title="支付信息">
            <el-descriptions-item label="">
                <el-descriptions align="right" class="flex flex-end" :column="1">
                    <el-descriptions-item label="支付方式：">{{payWay[store.payWay]}}</el-descriptions-item>
                    <el-descriptions-item label="余额支付：">
                        <el-input-number v-model="store.payIntegral" :min="store.minIntegralPrice||0" :max="Math.max(store.maxIntegralPrice,store.totalIntegralPrice)" @change="store.setPrice"></el-input-number>
                    </el-descriptions-item>
                    <el-descriptions-item label="账户余额：">{{ store.integral }}</el-descriptions-item>
                    <el-descriptions-item label="还需支付：">￥{{ payCash || 0}}</el-descriptions-item>
                    <el-descriptions-item>
                        <el-button size="large" type="danger" @click="onSubmit">提交订单</el-button>
                    </el-descriptions-item>
                </el-descriptions>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
export default defineComponent({
    name: 'Pay'
})
</script>
<script setup lang="ts">
import { useDataStore } from '../store';
const payWay = {
    1: '余额',
    2: '余额+现金',
    3: '现金',
}
const router = useRouter();
const store = useDataStore();
const payCash = computed(() => store.payCash);
const onSubmit = () => {
    store.submitOrder().then(res => {
        ElMessage.success('提交成功');
        router.push('/order');
    });
}
</script>
<style lang="scss" scoped>
// .pay {
//     background-color: var(--color-white);
// }
</style>