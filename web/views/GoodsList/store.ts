/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsParams } from './data';
import { queryData } from './service';
import { Pagination } from '@/@types/page'
import { Goods } from '@/@types/goods'

export interface IDetailState {
  loading: boolean;
  goodsList: Goods[];
  pageData: Pagination;
}

export const useDataStore = defineStore('goodsList', {
  state(): IDetailState {
    return {
      loading: false,
      pageData: {
        currentPage: 1,
        pageSize: 20,
        totalPage: 0
      },
      goodsList: [],
    };
  },
  actions: {
    async getData(params: GoodsParams) {
      try {
        this.loading = true;
        const response: IResponseData<{ records?: Goods[], page: Pagination }> = await queryData(params);
        const data = response.data?.records || [];
        if (data) {
          this.goodsList = params.currentPage > 1 ? [...this.goodsList, ...data] : data;
        }
        this.loading = false;
        this.pageData = response.data.page;
      } catch (error: any) {
        // console.log('error useDataStore getData', error);
      }
    },
  },
});
