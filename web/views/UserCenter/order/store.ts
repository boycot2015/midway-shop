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
        search: null,
        displayOrderStatus: '0',
      } as OrderParams,
      pageData: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0
      },
      list: [],
    };
  },
  actions: {
    setParams (val:any = {}) {
        for (const key in val) {
            if (Object.prototype.hasOwnProperty.call(this.params, key)) {
                this.params[key] = val[key]
            }
            if (Object.prototype.hasOwnProperty.call(this.pageData, key)) {
                this.pageData[key] = val[key]
            }
        }
        console.log(this.params, 'this.params');
        
        this.getData()
    },
    async getData() {
      try {
          this.loading = true;
          const response: IResponseData<{ records?: OrderList[], page: Pagination }> = await queryData({ ...this.params, ...this.pageData });
          this.list = [];
          let temp = response.data?.records || [];
          temp.map(({orderPackageEntriesVOList, orderEntriesVOList, ...el }) => {
            if (orderPackageEntriesVOList && orderPackageEntriesVOList.length) {
                let spanIndex = 0;
                let totalRows = orderPackageEntriesVOList.reduce((total, item) => total + (item.orderEntriesVOList?.length || 0), 0);
                orderPackageEntriesVOList.map((packageItem, packageIndex) => {
                    if (packageItem.orderEntriesVOList && packageItem.orderEntriesVOList.length) {
                        packageItem.orderEntriesVOList.map((orderGoods, index) => {
                            this.list.push({
                                ...el,
                                spanIndex: index,
                                packageIndex,
                                topSpanIndex: spanIndex,
                                topRows: totalRows,
                                childRows: packageItem.orderEntriesVOList.length,
                                package: packageItem,
                                orderGoods,
                            })
                            spanIndex++
                        })
                    }
                })
            } else {
                if (orderEntriesVOList && orderEntriesVOList.length) {
                    orderEntriesVOList.map((orderGoods, index) => {
                        this.list.push({
                            ...el,
                            topSpanIndex: index,
                            topRows: orderEntriesVOList.length,
                            spanIndex: index,
                            childRows: orderEntriesVOList.length,
                            orderGoods,
                        })
                    })
                }
            }
          }) || [];
          
        this.pageData = {
            ...this.pageData,
            totalRow: response.data?.page?.totalRow || 0,
            totalPage: response.data?.page?.totalPage || 0
        };
        this.loading = false;
      } catch (error: any) {
        console.log('error useDataStore getData', error);
      }
    },
  },
});
