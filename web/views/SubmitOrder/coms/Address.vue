<template>
     <el-descriptions title="收货信息" :columns="1">
        <el-descriptions-item>
            <div class="address flex flex-center flex-justify-between">
                <el-tag class="color-price mr10" size="large" type="danger">{{ (store.defaultAddress.isDefault?'默认':'') }}</el-tag>
                <el-select v-model="store.defaultAddress.id" class="flex-1">
                    <el-option v-for="item in store.addressList" :key="item.id" :value="item.id" :label="[item.provinceName, item.cityName, item.countyName, item.townName].join(' ')"></el-option>
                </el-select>
                <div class="actions flex-1 tl ml20">
                    <el-link>新增</el-link>
                    <el-link class="ml10">编辑</el-link>
                    <el-link class="ml10" type="danger">删除</el-link>
                </div>
            </div>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Address'
})
</script>
<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>
<style lang="scss" scoped>
.address {
    margin-bottom: 20px;
}
</style>