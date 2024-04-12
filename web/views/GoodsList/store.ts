/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsList, GoodsParams } from './data';
import { queryData } from './service';

export interface IDetailState {
  loading: boolean;
  goodsList: GoodsList[];
}

export const useDataStore = defineStore('goodsList', {
  state(): IDetailState {
    return {
      loading: false,
      goodsList: [],
    };
  },
  actions: {
    async getData(params: GoodsParams) {
      try {
        this.loading = true;
        const response: IResponseData<{ records?: GoodsList[] }> = await queryData(params);
        const data = response.data?.records || [];
        if (data) {
          this.goodsList = data;
        }
        this.loading = false;
      } catch (error: any) {
        // console.log('error useDataStore getData', error);
      }
    },
  },
});
