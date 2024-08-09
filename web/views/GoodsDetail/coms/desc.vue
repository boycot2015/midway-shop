<script lang="ts">
import { defineComponent, computed, ref, reactive, nextTick } from 'vue'
import { useDetailStore } from '../store';
import { GoodsDetail, RateData } from '../data.d';
import { Sku } from '@/@types/goods.d';
import { useRoute, useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>
<script lang="ts" setup>
// 读取数据
const activeTab = ref('1');
const rateParams = reactive({
    starType: '0',
    sortType: '0',
    currentPage: 1,
    pageSize: 20,
    totalRow: 0
})

const detailStore = useDetailStore();
const route = useRoute();
const router = useRouter();
const goodsData = computed<GoodsDetail>(() => detailStore.$state.goodsData)
const goodsComment = computed<RateData>(() => detailStore.$state.goodsComment)
const getAttrs = () => {
    let temp: any = {}
    goodsData.value.goodsAttributeList?.map(el => {
        temp[el.groupCode as string] = []
    })
    goodsData.value.goodsAttributeList?.map(el => {
        temp[el.groupCode as string].push(el)
    })
    return temp
}

let currentSku = ref(goodsData.value.goodsSkuList?.find(item => item.goodsSkuCode === route.query.goodsSkuCode) || {} as Sku);
const goodsAttributes = getAttrs()
// console.log('router, ctx', goodsData.value, goodsData.value, currentSku);

const onTabClick = (item?: any) => {
    rateParams.sortType = item
    nextTick(() => {
        detailStore.getRateData({ goodsCode: route.query.goodsCode, ...rateParams });
    })
}
detailStore.getRateData({ goodsCode: route.query.goodsCode, currentPage: 1, pageSize: 20 })

</script>
<template>
    <div class="desc">
        <div class="tabs">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="商品详情" name="1">
                    <div class="desc">
                        <el-descriptions :colon="true" :column="5">
                            <el-descriptions-item label="商品编码：">{{ currentSku.goodsSkuCode }}</el-descriptions-item>
                            <el-descriptions-item label="品牌：">{{ goodsData.brandName }}</el-descriptions-item>
                            <el-descriptions-item label="型号：">{{ goodsData.modelNumber }}</el-descriptions-item>
                            <el-descriptions-item label="产地：">{{ goodsData.productPlace }}</el-descriptions-item>
                            <el-descriptions-item label="单位：">{{ goodsData.goodsUnit }}</el-descriptions-item>
                            <el-descriptions-item label="【包装】长：">{{ goodsData.extent }}</el-descriptions-item>
                            <el-descriptions-item label="【包装】宽：">{{ goodsData.width }}</el-descriptions-item>
                            <el-descriptions-item label="【包装】高：">{{ goodsData.height }}</el-descriptions-item>
                        </el-descriptions>
                        <p class="tc" v-html="goodsData.goodsDescribeDetail?.goodsDescribe"></p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="规格参数" name="2">
                    <div class="others">
                        <el-form label-width="300px">
                            <el-form-item label="基本参数" label-width="70px">
                                <el-form-item label="商品编码：">{{ currentSku.goodsSkuCode }}</el-form-item>
                                <el-form-item label="品牌：">{{ goodsData.brandName }}</el-form-item>
                                <el-form-item label="型号：">{{ goodsData.modelNumber }}</el-form-item>
                                <el-form-item label="产地：">{{ goodsData.productPlace }}</el-form-item>
                                <el-form-item label="单位：">{{ goodsData.goodsUnit }}</el-form-item>
                                <el-form-item label="【包装】长：">{{ goodsData.extent }}</el-form-item>
                                <el-form-item label="【包装】宽：">{{ goodsData.width }}</el-form-item>
                                <el-form-item label="【包装】高：">{{ goodsData.height }}</el-form-item>
                            </el-form-item>
                            <el-form-item :label="groups[0].groupName" v-for="groups in goodsAttributes"
                                :key="groups[0].groupCode" label-width="70px">
                                <el-form-item :label="group.attributeName + '：'" v-for="group in groups"
                                    :key="group.groupCode">{{ group.attributeValueName }}</el-form-item>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="评价" name="3">
                    <div class="rate" v-if="activeTab == '3'">
                        <div class="header">
                            <el-tabs v-model="rateParams.starType" @tab-click="() => onTabClick()">
                                <el-tab-pane :label="`全部评论(${goodsComment.allNum})`" name="0"></el-tab-pane>
                                <el-tab-pane :label="`好评(${goodsComment.goodNum})`" name="1"></el-tab-pane>
                                <el-tab-pane :label="`中评(${goodsComment.normalNum})`" name="2"></el-tab-pane>
                                <el-tab-pane :label="`差评(${goodsComment.negativeNum})`" name="3"></el-tab-pane>
                            </el-tabs>
                            <div class="sort">
                                <el-dropdown @command="onTabClick">
                                    <span class="el-dropdown-link">
                                        {{ rateParams.sortType == '0' ? '默认' : '最新' }}
                                        <el-icon class="el-icon--right">
                                            <arrow-down />
                                        </el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="0">默认</el-dropdown-item>
                                            <el-dropdown-item command="1">最新</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="body">
                            <div class="rate-list">
                                <div class="rate-list-item flex" v-for="item in goodsComment.records" :key="item.id">
                                    <el-space class="user flex flex-1 mr20">
                                        <el-avatar :src="item.memberAvatar"></el-avatar>
                                        <p class="username">{{ item.memberNickName }}</p>
                                    </el-space>
                                    <el-form inline class="content tl flex-2" style="width: 100%;">
                                        <el-form-item class="rate-items" label="商品符合度：">
                                            <el-rate disabled v-model="item.goodsStar" :num="5"></el-rate>
                                        </el-form-item>
                                        <el-form-item class="rate-items" label="物流配送速度：">
                                            <el-rate disabled v-model="item.expressStar" :num="5"></el-rate>
                                        </el-form-item>
                                        <el-form-item class="rate-items" label="客服服务态度：">
                                            <el-rate disabled v-model="item.goodsStar" :num="5"></el-rate>
                                        </el-form-item>
                                        <el-form-item style="width: 800px;">
                                            <p>{{ item.content }}</p>
                                            <div class="img-list">
                                                <el-image style="width: 60px;height: 60px;" :initial-index="index"
                                                    class="mr20"
                                                    v-for="(image, index) in item.imgUrls.split(',').filter(_ => _)"
                                                    :key="image" :src="image"
                                                    :preview-src-list="item.imgUrls.split(',').filter(_ => _)"></el-image>
                                            </div>
                                        </el-form-item>
                                        <div class="flex flex-justify-between">
                                            <el-form-item>{{ item.goodsName }}</el-form-item>
                                            <el-form-item>{{ item.createTime }}</el-form-item>
                                            <el-form-item>
                                                <p class="flex flex-justify-between">
                                                    <span><font-awesome-icon :icon="['fas', 'thumbs-up']" /> 有用</span>
                                                    <span><font-awesome-icon :icon="['fas', 'thumbs-down']" /> 无用</span>
                                                    <span><font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
                                                        举报</span>
                                                </p>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    margin-top: 20px;

    .tabs {
        min-height: 400px;

        .others {
            .el-form>.el-form-item {
                border-bottom: 1px solid var(--color-border);
                padding-bottom: 20px;

                &:last-child {
                    border: 0;
                    padding-bottom: 0;
                }

                .el-form-item {
                    width: 100%;

                    :deep(.el-form-item__label) {
                        width: 100px;
                        text-align: right;
                    }
                }
            }
        }

        .rate {
            position: relative;

            &-list-item {
                border-bottom: 1px solid var(--color-border);
                margin-bottom: 10px;

                &:last-child {
                    margin-bottom: 0;
                    border: 0;
                }
            }

            .sort {
                position: absolute;
                right: 0;
                top: 10px;
            }
        }
    }
}
</style>
