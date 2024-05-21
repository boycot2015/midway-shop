import { defineStore } from 'pinia';
import request from '@/utils/request';
import { Sku, GoodsSkuImage, GoodsSkuSpec } from '@/@types/goods'
type CartItem = {
    "addCartTime": Date
    "cartItems": Sku[]
    "goodsCode": string
    "goodsName": string
    "goodsSkuImageList": GoodsSkuImage[]
    "goodsSkuList": Sku[]
    "goodsSkuSalesAreaList": []
    "goodsSpecList": GoodsSkuSpec[]
    "goodsTitle": string
    "goodsUnit": string
    "isThirdGoods": false,
    "taxRate": number,
    "taxRateDescription": string
}
type  CartInfo = {
    "invalidCartItems": CartItem[],
    "validCartItems": CartItem[]
}
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
        loading: false,
        list: [] as CartInfo[],
        totalCount: 0,
        totalAmount: 0,
        totalQuantity: 0,
        selectedGoodsList: [] as Sku[],
    };
  },
  actions: {
    async getCartData (data?: any) {
        this.loading = true;
        let response = await request({
            url: '/api/shoppingcart/countCart',
            method: 'get',
        });
        this.totalCount = response.data as unknown as number || 0;
        if (!data) {
            this.loading = false;
            return;
        }
        let responseList = await request({
            url: '/shoppingcart/queryCartList',
            method: 'post',
            data
        });
        this.list = responseList.data as unknown as CartInfo[] || [];
        this.loading = false;
    }
  },
  persist: true,
});
