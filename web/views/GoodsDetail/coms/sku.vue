<script lang="ts">
import { defineComponent, computed, ref, reactive, nextTick } from 'vue'
import { useDetailStore } from '../store';
import { useCartStore } from '@/store/cart';
import { GoodsDetail } from '../data.d';
import { Sku } from '@/@types/goods.d';
import { useRoute, useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const cartStore = useCartStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig || {});
</script>
<script lang="ts" setup>
// 读取数据
const currentIndicator = ref(0);
const carouselRef = ref<any>(null);
const detailStore = useDetailStore();
const route = useRoute();
const router = useRouter();
const goodsData = computed<GoodsDetail>(()=> detailStore.$state.goodsData)

const region = ref({
    provinceId: '',
    cityId: '',
    countyId: ''
})
let currentSku = ref(goodsData.value.goodsSkuList?.find(item => item.goodsSkuCode === route.query.goodsSkuCode) || {} as Sku);
// console.log('router, ctx', goodsData.value, goodsData.value, currentSku);
const onChangeCarousel = (item, index) => {
    carouselRef.value.setActiveItem(index);
}
// 切换sku
const onChangeSku = (current, index) => {
    currentSku.value = goodsData.value.goodsSkuList[index] as Sku;
}
// 添加购物车
const onAddCart = () => {
    cartStore.addCart({ quantity: currentSku.value.minimumOrderQuantity || 1, goodsCode: currentSku.value.goodsCode, goodsSkuCode: currentSku.value.goodsSkuCode, integralPrice: currentSku.value.integralPrice });
}
// 立即购买
const onBuy = () => {
    cartStore.setSelectedGoodsList([{ quantity: currentSku.value.minimumOrderQuantity || 1, goodsCode: currentSku.value.goodsCode, goodsSkuCode: currentSku.value.goodsSkuCode,integralPrice: 0, }]);
    router.push({ path: '/order/submit' });
}
</script>
<template>
  <div class="detail-top">
      <div class="category-nav">
          <el-breadcrumb :separator="'>'">
              <el-breadcrumb-item>{{goodsData.firstCategoryName}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{goodsData.secondCategoryName}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{goodsData.lastCategoryName}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="detail-sku flex">
          <div class="imgs">
              <el-carousel
              ref="carouselRef"
              indicator-position="none"
              :interval="5000"
              arrow="always"
              height="500px"
              v-if="currentSku.goodsSkuImage"
              @change="val => currentIndicator = val"
              >
                  <el-carousel-item v-for="item in currentSku.goodsSkuImage" :key="item.imgName">
                      <el-image style="height: 100%;width: 100%;" :src="item.imgUrl"></el-image>
                  </el-carousel-item>
              </el-carousel>
              <div class="indicator flex">
                  <div class="indicator-item" :class="{'active': currentIndicator === index}" v-for="(item, index) in currentSku.goodsSkuImage" :key="item.imgName" @click="onChangeCarousel(item, index)">
                      <img width="60" height="60" :src="item.imgUrl" :alt="item.imgName">
                  </div>
              </div>
          </div>
          <div class="text ml20">
              <el-form>
                  <el-form-item>
                      <div class="name">{{ currentSku.goodsSkuName }}</div>
                  </el-form-item>
                  <el-form-item>
                      <div class="sub-title">{{ currentSku.goodsSkuTitle }}</div>
                  </el-form-item>
                  <div class="box">
                      <el-form-item label="价格">
                          <div>
                              <span class="price-text" v-if="currentSku.isQuotaGoods">￥{{ currentSku.sellingPrice }}</span>
                              <span class="price-text" v-else>{{ currentSku.integralPrice }} {{ websiteConfig.websiteUnit }}</span>
                          </div>
                      </el-form-item>
                      <el-form-item label="配送">
                          <div class="region-select-group">
                              至
                              <el-select placeholder="请选择" key="provinceId" v-model="region.provinceId">
                                  <el-option :label="'北京'" :value="'1'"></el-option>
                              </el-select>
                              <el-select placeholder="请选择" key="cityId" v-model="region.cityId">
                                  <el-option :label="'朝阳市'" :value="'2'"></el-option>
                              </el-select>
                              <el-select placeholder="请选择" key="countyId" v-model="region.countyId">
                                  <el-option :label="'朝阳区'" :value="'3'"></el-option>
                              </el-select>
                              有货
                          </div>
                      </el-form-item>
                      <el-form-item label="服务">{{ goodsData.returnGoodsRulesName }}</el-form-item>
                  </div>
                  <el-form-item :label="goodsSpec.specName" v-for="(goodsSpec, index) in goodsData.goodsSpecList" :key="goodsSpec.specId">
                      <el-button class="color-item fl" v-if="currentSku.goodsSkuSpec" :type="currentSku.goodsSkuSpec.find(val => goodsSpec.specId === val.specNameCode)?.specValueCode === spec.valueId ? 'primary':''" v-for="(spec, index) in goodsSpec.values" :key="spec.valueId" @click="onChangeSku(spec, index)">
                          {{ spec.valueName }}
                  </el-button>
                  </el-form-item>
                  <el-form-item label="数量：">
                      <el-input-number v-model="currentSku.minimumOrderQuantity" :step="1" step-strictly />
                  </el-form-item>
                  <el-form-item>
                      <div class="actions flex" style="width: 100%;">
                          <el-button size="large" @click="onAddCart">加入购物车</el-button>
                          <el-button size="large" type="primary" @click="onBuy">立即购买</el-button>
                          <el-button class="star" size="large">
                              <el-rate v-model="currentSku.minimumOrderQuantity" :max="1"></el-rate>
                              收藏
                          </el-button>
                      </div>
                  </el-form-item>
              </el-form>
          </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.detail {
    margin-top: 20px;
    &-sku {
        margin: 20px 0;
        .imgs {
            border: 1px solid var( --color-border );
            width: 500px;
            height: 562px;
            img {
                width: 100%;
                height: 100%;
            }
            .indicator {
                height: 60px;
                width: 100%;
                max-width: 100%;
                flex-wrap: nowrap;
                border-top: 1px solid var( --color-border );
                &-item {
                    height: 100%;
                    cursor: pointer;
                    // transition: all 0.3s;
                    border: 2px solid var( --color-border );
                    border-left: 0;
                    border-top: 0;
                    &.active {
                        position: relative;
                        border-width: 2px;
                        z-index: 2;
                        border-color: var( --color-primary );
                        &::before,
                        &::after {
                            position: absolute;
                            content: '';
                            left: 0;
                            top: 0;
                            z-index: 1;
                            height: 100%;
                            width: 2px;
                            background-color: var( --color-primary );
                        }
                        &::after {
                            top: 0;
                            width: 100%;
                            height: 2px;
                        }
                    }
                }
            }
        }
        .text {
            flex: 1;
            text-align: left;
            .el-form-item {
                margin-bottom: 20px;
            }
            .name {
                line-height: 24px;
                font-size: 18px;
                color: #333;
            }
            .sub-title {
                font-size: 14px;
                color: red;
            }
            .box {
                padding: 10px;
                width: 100%;
                background-color: var(--color-bg);
                margin-bottom: 20px;
                .el-form-item:last-child {
                    margin-bottom: 0;
                }
                .price-text {
                    font-size: 24px;
                    // font-weight: bold;
                    color: var(--color-primary);
                }
            }
            .region-select-group {
                .el-select {
                    width: 120px;
                }
            }
        }
    }
}
</style>


