/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsParams } from './data';
import { queryData } from './service';
import { Pagination } from '@/@types/page';
import { Goods } from '@/@types/goods';

export interface IDetailState {
  loading: boolean;
  pageLoading: boolean;
  query: GoodsParams;
  goodsList: Goods[];
  pageData: Pagination;
}

export const useDataStore = defineStore('goodsList', {
  state(): IDetailState {
    return {
      loading: false,
      pageLoading: true,
      query: {
        onlyInStock: true,
      } as GoodsParams,
      pageData: {
        currentPage: 1,
        pageSize: 20,
        totalPage: 0,
      },
      goodsList: [],
    };
  },
  actions: {
    async getData(params?: GoodsParams) {
      try {
        this.loading = true;
        this.pageLoading =
          params?.currentPage === 1 || this.pageData.currentPage === 1;
        params = {
          ...this.query,
          ...(params || {}),
          onlyInStock: this.query.onlyInStock || null,
        };
        const response: IResponseData<{ records?: Goods[]; page: Pagination }> =
          await queryData(params);
        const data = response.data?.records || [];
        if (data) {
          this.goodsList =
            params.currentPage > 1 ? [...this.goodsList, ...data] : data;
        }
        this.loading = false;
        this.pageLoading = false;
        this.pageData = {
          ...this.pageData,
          totalPage: response.data?.page.totalPage || 0,
        };
      } catch (error: any) {
        // console.log('error useDataStore getData', error);
      }
    },
  },
});
