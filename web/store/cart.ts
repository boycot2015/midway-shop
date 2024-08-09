import { defineStore } from 'pinia';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import { IResponseData } from '@/@types/utils.request';
import { Sku, GoodsSkuImage, GoodsSkuSpec, Goods } from '@/@types/goods';
interface CartItem extends Sku {
  addCartTime?: Date;
  cartItems?: Sku[];
  goodsName?: string;
  goodsSkuImageList?: GoodsSkuImage[];
  goodsSkuList?: Sku[];
  goodsSkuSalesAreaList?: [];
  goodsSpecList?: GoodsSkuSpec[];
  goodsTitle?: string;
  goodsUnit?: string;
  isThirdGoods?: false;
  taxRate?: number;
  taxRateDescription?: string;
}
type CartInfo = {
  invalidCartItems: CartItem[];
  validCartItems: CartItem[];
};
export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      loading: true,
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
    async getCartCount() {
      const response = await request({
        url: '/api/shoppingcart/countCart',
        method: 'post',
      });
      this.totalCount = (response.data as unknown as number) || 0;
    },
    getCartData(data: any = {}) {
      this.loading = true;
      this.validCartItems = [];
      this.invalidCartItems = [];
      request<IResponseData<CartInfo[]>>({
        url: '/api/shoppingcart/queryCartList',
        method: 'post',
        data,
      }).then(responseList => {
        this.list = (responseList.data as unknown as CartInfo) || {};
        this.list.validCartItems.map(item => {
          item.cartItems?.map(cart => {
            this.validCartItems.push({ ...cart, ...item });
          });
        });
        this.list.invalidCartItems.map(item => {
          item.cartItems?.map(cart => {
            this.invalidCartItems.push({ ...cart, ...item });
          });
        });
        this.setSelectedGoodsList([]);
        this.loading = false;
      });
    },
    async addCart(data: CartItem) {
      this.loading = true;
      const response: IResponseData = await request({
        url: '/api/shoppingcart/addCart',
        method: 'post',
        data: {
          quantity: data.quantity || 1,
          goodsCode: data.goodsCode,
          goodsSkuCode: data.goodsSkuCode,
        },
      });
      if (response.success) {
        ElMessage.success('添加成功');
        this.getCartCount();
      }
      this.loading = false;
    },
    async updateCart(data: CartItem) {
      // console.log(data, 'updateCart');
      const response: IResponseData = await request({
        url: '/api/shoppingcart/updateCart',
        method: 'post',
        data: {
          quantity: data.quantity,
          goodsCode: data.goodsCode,
          oldGoodsSkuCode: data.goodsSkuCode,
          newGoodsSkuCode: data.goodsSkuCode,
        },
      });
      if (response.success) {
        const currentIndex = this.selectedGoodsList.findIndex(
          el => el.goodsSkuCode === data.goodsSkuCode
        );
        if (currentIndex === -1) return;
        this.selectedGoodsList[currentIndex].quantity = data.quantity;
        this.setSelectedGoodsList(this.selectedGoodsList);
      } else {
        ElMessage.error('更新购物车失败');
      }
      // this.loading = false;
    },
    async deleteCart(data: Goods) {
      this.loading = true;
      const response: IResponseData = await request({
        url: '/api/shoppingcart/deleteCart',
        method: 'post',
        data: {
          goodsCode: data.goodsCode,
          goodsSkuCode: data.goodsSkuCode,
        },
      });
      if (response.success) {
        ElMessage.success('删除成功');
        this.getCartCount();
      }
      this.loading = false;
    },
    setTotoalAmount() {
      this.totalAmount = this.selectedGoodsList.reduce((prev, next) => {
        return prev + (+next.integralPrice || 0) * next.quantity;
      }, 0);
    },
    setTotoalQuantity() {
      this.totalQuantity = this.selectedGoodsList.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0);
    },
    setSelectedGoodsList(selection: CartItem[]) {
      this.selectedGoodsList = selection;
      this.setTotoalAmount();
      this.setTotoalQuantity();
    },
  },
  persist: true,
});
