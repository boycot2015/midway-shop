/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsDetail, RateData } from './data';
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
    async getDetail(goodsCode: string):Promise<any> {
        this.loading = true;
        let response: IResponseData<GoodsDetail> = await queryDetail(goodsCode)
        .catch((error: any) => {
            console.log('error useDetailStore getDetail', error);
        })
        const data = response.data || {} as GoodsDetail;
        if (data) {
          this.goodsData = data;
        }
        this.loading = false;
    },
    getRateData (params: any) {
        try {
            getGoodsCommentList(params).then((response: IResponseData<RateData>) => {
              const data = response.data || {} as RateData;
              if (data) {
                this.goodsComment = data;
              }
          });
        } catch (error: any) {
          console.log('error useDetailStore getRateData', error);
        }
    },
  },
});
