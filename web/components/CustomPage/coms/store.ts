/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { GoodsItemProps, GoodsParams } from '@/components/GoodsItem/data.d';
import { queryData } from './service';

export interface IDataState {
  loading: boolean;
}

export const useDataStore = defineStore('CustomPage', {
  state(): IDataState {
    return {
      loading: false,
    };
  },
  actions: {
    async getData(params: GoodsParams): Promise<GoodsParams[]> {
      try {
        this.loading = true;
        const response: IResponseData<GoodsItemProps[]> = await queryData(
          params
        );
        const data = response.data || [];
        if (data) {
          return Promise.resolve(data);
        }
        this.loading = false;
      } catch (error: any) {
        // console.log('error useDataStore getData', error);
        return Promise.resolve([]);
      }
      return Promise.resolve([]);
    },
  },
});
