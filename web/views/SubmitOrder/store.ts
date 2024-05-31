/**
 * Detail store
 * @author Mr Zhang
 */
 import { defineStore } from 'pinia';
 import { IResponseData } from '@/@types/utils.request';
 import { GoodsParams, OrderParams, PayData, PayParams } from './data';
import { Sku } from '@/@types/goods';
 import { getAddressData, queryData, submit, getPayData, getOrderPayData } from './service';
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
    payData: PayData,
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
    "submitOrderToken": string,
    "totalAfterDiscountIntegralPrice": null,
    "totalAfterDiscountSellingPrice": null,
    "totalIntegralPrice": 500,
    "totalPayIntegral": 500,
    "totalPayPrice": 0,
    "totalSellingPrice": 0
}
 
 export const useDataStore = defineStore('submitOrderData', {
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
        payData: {
            payMethod: 1001,
        } as PayData,
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
        "submitOrderToken": '',
        "totalAfterDiscountIntegralPrice": null,
        "totalAfterDiscountSellingPrice": null,
        "totalIntegralPrice": 500,
        "totalPayIntegral": 500,
        "totalPayPrice": 0,
        "totalSellingPrice": 0
     };
   },
   actions: {
     getData(shoppingCart?:boolean|string) {
       try {
         this.loading = true;
         getAddressData().then((address: IResponseData<Address[]>) => {
             if (address.success && address.data) {
                this.addressList = address.data;
                this.shoppingCart = !!shoppingCart;
                this.defaultAddress = this.addressList.find(item => item.isDefault) || this.addressList[0] || {}
                queryData({
                    addressId: this.defaultAddress.id,
                    shoppingCart: !!shoppingCart,
                    goodsList: this.goodsList.map(el => ({
                        goodsCode: el.goodsCode,
                        num: el.quantity,
                        activityId: el.activityId,
                        goodsSkuCode: el.goodsSkuCode
                    }))
                 } as OrderParams).then((response: IResponseData<{ goodsList?: Sku[] }>) => {
                    if (response.success && response.data) {
                        for (const key in response.data) {
                            this[key] = response.data[key];
                        }
                        this.payIntegral = this.totalPayIntegral;
                        this.payCash = ((this.totalIntegralPrice - this.totalPayIntegral) * 1 / this.integralRatio).toFixed(2) || 0
                   } else {
                     ElMessage.error(response.data as string || response.message);
                   }
                   this.loading = false;
                });
            }
         });
       } catch (error: any) {
         console.log('error useDataStore getData', error);
       }
     },
     setData(params?: any) {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                this[key] = params[key];
            }
        }
        return Promise.resolve(params)
      },
      setPrice (val) {
        this.payCash = ((this.totalIntegralPrice - this.payIntegral) * 1 / this.integralRatio).toFixed(2) || 0
      },
      submitOrder() {
        // console.log('submitOrder');
        return new Promise<PayData>(async (resolve, reject) => {
            const response: IResponseData<PayData> = await submit({
                submitOrderToken: this.submitOrderToken,
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
            this.submitOrderToken = response.data?.submitOrderToken || '';
            this.payData = response.data || {};
            !response.success && ElMessage.error('提交失败');
            response.success && resolve(response.data);
        })
      },
      getPayData (orderCode: string): Promise<any> {
        return getPayData({ orderCode }).then((response:IResponseData<PayData>) => {
            if (response.success && response.data) {
                this.payData = { ...this.payData, ...response.data || {} };
            }
            return response;
        });
      },
      getOrderPayData (params: PayParams) {
        this.loading = true;
        return getOrderPayData(params).then((response:IResponseData<string>) => {
            if (response.success && response.data) {
                this.payData.qrCode = response.data || '';
            }
            this.loading = false;
            return response;
        });
      },
      
   },
   persist: true,
 });
 