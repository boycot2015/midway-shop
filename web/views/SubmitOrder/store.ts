/**
 * Detail store
 * @author Mr Zhang
 */
 import { defineStore } from 'pinia';
 import { IResponseData } from '@/@types/utils.request';
 import { GoodsParams, OrderParams } from './data';
import { Sku } from '@/@types/goods';
 import { getAddressData, queryData, submit } from './service';
 import { Address } from '@/@types/address';
 import { ElMessage } from 'element-plus';

 export interface IDataState {
    loading: boolean;
    goodsList: GoodsParams[];
    addressList: Address[];
    defaultAddress: Address,
    shoppingCart: boolean,
    payCash: number| string | 0,
    buyerMsg: string,
    payIntegral: number,
    "groupBookingOrder": false,
    "integral": 9830345,
    "integralRatio": 100,
    "integralUnit": "分",
    "interestsCardOrder": false,
    "interestsId": null,
    "interestsName": "",
    "isQuotaGoods": false,
    "limitedSaleOrder": false,
    "maxIntegralPrice": 500,
    "minIntegralPrice": 0,
    "minRequiredCash": 0,
    "needPayPassword": false,
    "originalGoodsList": [],
    "payWay": 2,
    "portfolioOrder": false,
    "seckillOrder": false,
    "submitOrderToken": "B2C:ORDER:TOKEN:672128:1207041",
    "totalAfterDiscountIntegralPrice": null,
    "totalAfterDiscountSellingPrice": null,
    "totalIntegralPrice": 500,
    "totalPayIntegral": 500,
    "totalPayPrice": 0,
    "totalSellingPrice": 0
}
 
 export const useDataStore = defineStore('orderData', {
   state(): IDataState {
     return {
        loading: false,
        addressList: [],
        defaultAddress: {} as Address,
        goodsList: [],
        payCash: 0,
        payIntegral: 0,
        buyerMsg: '',
        shoppingCart: false,
        "groupBookingOrder": false,
        "integral": 9830345,
        "integralRatio": 100,
        "integralUnit": "分",
        "interestsCardOrder": false,
        "interestsId": null,
        "interestsName": "",
        "isQuotaGoods": false,
        "limitedSaleOrder": false,
        "maxIntegralPrice": 500,
        "minIntegralPrice": 0,
        "minRequiredCash": 0,
        "needPayPassword": false,
        "originalGoodsList": [],
        "payWay": 2,
        "portfolioOrder": false,
        "seckillOrder": false,
        "submitOrderToken": "B2C:ORDER:TOKEN:672128:1207041",
        "totalAfterDiscountIntegralPrice": null,
        "totalAfterDiscountSellingPrice": null,
        "totalIntegralPrice": 500,
        "totalPayIntegral": 500,
        "totalPayPrice": 0,
        "totalSellingPrice": 0
     };
   },
   actions: {
     async getData(shoppingCart?:boolean) {
       try {
         this.loading = true;
         const address: IResponseData<Address[]> = await getAddressData();
         if (address.success && address.data) {
            this.addressList = address.data;
        }
        this.shoppingCart = shoppingCart || false;
        this.defaultAddress = this.addressList.find(item => item.isDefault) || this.addressList[0] || {}
        const response: IResponseData<{ goodsList?: Sku[] }> = await queryData({
            addressId: this.defaultAddress.id,
            shoppingCart: !!shoppingCart,
            goodsList: this.goodsList.map(el => ({
                goodsCode: el.goodsCode,
                num: el.quantity,
                activityId: el.activityId,
                goodsSkuCode: el.goodsSkuCode
            }))
         } as OrderParams);
         if (response.success && response.data) {
             for (const key in response.data) {
                 this[key] = response.data[key];
             }
             this.payIntegral = this.totalPayIntegral;
             this.payCash = ((this.totalIntegralPrice - this.totalPayIntegral) * 1 / this.integralRatio).toFixed(2) || 0
        }
        this.loading = false;
       } catch (error: any) {
         console.log('error useDataStore getData', error);
       }
     },
     setData(params: GoodsParams[]) {
        this.goodsList = params
      },
      setPrice (val) {
        this.payCash = ((this.totalIntegralPrice - this.payIntegral) * 1 / this.integralRatio).toFixed(2) || 0
      },
      submitOrder() {
        console.log('submitOrder');
        return new Promise(async (resolve, reject) => {
            const response: IResponseData<{ goodsList?: Sku[] }> = await submit({
                "submitOrderToken": "B2C:ORDER:TOKEN:672128:1207188",
                payCash:this.payCash,
                buyerMsg: this.buyerMsg,
                payIntegral: this.payIntegral,
                addressId: this.defaultAddress.id,
                shoppingCart: this.shoppingCart,
                goodsList: this.goodsList.map(el => ({
                    goodsCode: el.goodsCode,
                    num: el.num,
                    activityId: el.activityId,
                    goodsSkuCode: el.goodsSkuCode
                }))
             } as OrderParams);
            !response.success && ElMessage.error('提交失败');
            response.success && resolve(response);
        })
      },
   },
   persist: true,
 });
 