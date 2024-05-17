/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsDetail, RateData } from './data.d';
import { queryDetail, getGoodsCommentList } from './service';

export interface IDetailState {
  loading: boolean;
  goodsData: GoodsDetail;
  goodsComment: RateData;
}

export const useDetailStore = defineStore('detail', {
  state(): IDetailState {
    return {
      loading: false,
      goodsData: {
        goodsSkuList: []
      },
      goodsComment: {}
    };
  },
  actions: {
    async getDetail(goodsCode: string) {
      try {
        this.loading = true;
        const response: IResponseData<GoodsDetail> = await queryDetail(goodsCode);
        const data = response.data || {} as GoodsDetail;
        if (data) {
          this.goodsData = data;
        }
        this.loading = false;
      } catch (error: any) {
        console.log('error useDetailStore getDetail', error);
      }
    },
    async getRateData (params: any) {
        try {
          this.loading = true;
          const response: IResponseData<RateData> = await getGoodsCommentList(params);
          const data = response.data || {} as RateData;
          if (data) {
            this.goodsComment = data;
          }
          this.loading = false;
        } catch (error: any) {
          console.log('error useDetailStore getRateData', error);
        }
    },
  },
});
