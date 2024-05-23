import { defineStore } from 'pinia';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import { IResponseData } from '@/@types/utils.request';
import { Sku, GoodsSkuImage, GoodsSkuSpec, Goods } from '@/@types/goods'
interface CartItem extends Sku {
    "addCartTime": Date
    "cartItems": Sku[]
    "goodsName": string
    "goodsSkuImageList": GoodsSkuImage[]
    "goodsSkuList": Sku[]
    "goodsSkuSalesAreaList": []
    "goodsSpecList": GoodsSkuSpec[]
    "goodsTitle": string
    "goodsUnit": string
    "isThirdGoods": false
    "taxRate": number
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
        list: {} as CartInfo,
        validCartItems: [] as CartItem[] & Sku[],
        invalidCartItems: [] as CartItem[] & Sku[],
        totalCount: 0,
        totalAmount: 0,
        totalQuantity: 0,
        selectedGoodsList: [] as CartItem[] & Sku[],
    };
  },
  actions: {
    async getCartCount () {
        let response = await request({
            url: '/api/shoppingcart/countCart',
            method: 'post',
        });
        this.totalCount = response.data as unknown as number || 0;
    },
    async getCartData (data: any = {}) {
        this.loading = true;
        this.validCartItems = [];
        this.invalidCartItems = [];
        let responseList = await request<IResponseData<CartInfo[]>>({
            url: '/api/shoppingcart/queryCartList',
            method: 'post',
            data
        });
        this.list = responseList.data as unknown as CartInfo || {};
        
        this.list.validCartItems.map(item => {
            item.cartItems.map(cart => {
                this.validCartItems.push({ ...cart, ...item });
            })
        });
        this.list.invalidCartItems.map(item => {
            item.cartItems.map(cart => {
                this.invalidCartItems.push({ ...cart, ...item });
            })
        });
        this.loading = false;
    },
    async addCart (data: Goods) {
        this.loading = true;
        let response:IResponseData = await request({
            url: '/api/shoppingcart/addCart',
            method: 'post',
            data: {
               quantity: 1,
               goodsCode: data.goodsCode,
               goodsSkuCode: data.goodsSkuCode
            }
        });
        if (response.success) {
            ElMessage.success('添加成功');
            this.getCartCount();
        }
        this.loading = false;
    },
    async updateCart (data: Goods) {
        this.loading = true;
        let response:IResponseData = await request({
            url: '/api/shoppingcart/updateCart',
            method: 'post',
            data: {
               quantity: 1,
               goodsCode: data.goodsCode,
               goodsSkuCode: data.goodsSkuCode
            }
        });
        if (response.success) {
            ElMessage.success('更新成功');
            this.getCartCount();
        }
        this.loading = false;
    },
    async deleteCart (data: Goods) {
        this.loading = true;
        let response:IResponseData = await request({
            url: '/api/shoppingcart/deleteCart',
            method: 'post',
            data: {
               goodsCode: data.goodsCode,
               goodsSkuCode: data.goodsSkuCode
            }
        });
        if (response.success) {
            ElMessage.success('删除成功');
            this.getCartCount();
        }
        this.loading = false;
    },
    setTotoalAmount () {
        this.totalAmount = this.selectedGoodsList.reduce((prev, next) => {
            return prev + (next.integralPrice * next.quantity);
        }, 0);
    },
    setTotoalQuantity () {
        this.totalQuantity = this.selectedGoodsList.reduce((prev, next) => {
            return prev + next.quantity;
        }, 0);
    },
    setSelectedGoodsList (selection) {
        // console.log(selection, 'selection');
        this.selectedGoodsList = selection;
        this.setTotoalAmount();
        this.setTotoalQuantity();
    }
  },
  persist: true,
});
