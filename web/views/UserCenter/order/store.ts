/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { OrderList, OrderParams } from './data';
import { queryData } from './service';
import { Pagination } from '@/@types/page'

export interface IDataState {
  loading: boolean;
  list: OrderList[];
  params: OrderParams;
  pageData: Pagination;
}

export const useDataStore = defineStore('orderList', {
  state(): IDataState {
    return {
      loading: false,
      params: {
        displayOrderStatus: '0',
      } as OrderParams,
      pageData: {
        currentPage: 1,
        pageSize: 20,
        totalPage: 0
      },
      list: [],
    };
  },
  actions: {
    setPageData (val, prop) {
        this.pageData[prop] = val;
        this.getData();
    },
    async getData(params?: Pagination | OrderParams) {
      try {
          this.list = [];
          this.loading = true;
          const response: IResponseData<{ records?: OrderList[], page: Pagination }> = await queryData({ ...this.params, ...this.pageData, ...params });
          let temp = response.data?.records || [];
          temp.map(({orderPackageEntriesVOList, orderEntriesVOList, ...el }) => {
            if (orderPackageEntriesVOList && orderPackageEntriesVOList.length) {
                orderPackageEntriesVOList.map(packageItem => {
                    if (packageItem.orderEntriesVOList && packageItem.orderEntriesVOList.length) {
                        packageItem.orderEntriesVOList.map((orderGoods, index) => {
                            this.list.push({
                                ...el,
                                spanIndex: index,
                                totalRows: packageItem.orderEntriesVOList.length,
                                package: packageItem,
                                orderGoods,
                            })
                        })
                    }
                })
            } else {
                if (orderEntriesVOList && orderEntriesVOList.length) {
                    orderEntriesVOList.map((orderGoods, index) => {
                        this.list.push({
                            ...el,
                            spanIndex: index,
                            totalRows: orderEntriesVOList.length,
                            orderGoods,
                        })
                    })
                }
            }
          }) || [];
          
        this.pageData = {
            ...this.pageData,
            totalRow: response.data?.page?.totalPage || 0,
            totalPage: response.data?.page?.totalPage || 0
        };
        this.loading = false;
      } catch (error: any) {
        console.log('error useDataStore getData', error);
      }
    },
  },
});
