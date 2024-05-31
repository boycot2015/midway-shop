/**
 * Detail store
 * @author Mr Zhang
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter, Router } from 'vue-router';
import { IResponseData } from '@/@types/utils.request';
import { OrderList, OrderParams, Package } from './data';
import { queryData, queryDetailData } from './service';
import { Pagination } from '@/@types/page';
import { useDataStore as useSubmitStore } from '@/views/SubmitOrder/store';

export interface IDataState {
  loading: boolean;
  list: Package[];
  params: OrderParams;
  pageData: Pagination;
  detail: OrderList;
  router: Router;
}
export const payWay = {
    1: '余额',
    2: '余额+现金',
    3: '现金',
}
export const tabs = ref([
    { title: '全部订单', value: '0', type: '' },
    { title: '待支付', value: '1001', type: 'danger' },
    { title: '待发货', value: '1002', type: 'warning' },
    { title: '待发货', value: '1007', type: 'warning', hidden: true },
    { title: '部分发货', value: '2010', type: 'primary', hidden: true },
    { title: '已取消', value: '1005', type: 'info', hidden: true },
    { title: '待核销', value: '1012', type: 'primary', hidden: true },
    { title: '已发货', value: '1003', type: 'primary' },
    { title: '已完成', value: '1004', type: 'success' },
]);
export const displayOrderStatus = ref({});
export const displayOrderStatusType = ref({});
export const packageStatus = ref({
    1007: {
        type: 'warning',
        title: '待发货',
    },
    1008: {
        type: 'primary',
        title: '已发货',
    },
    1009: {
        type: 'success',
        title: '已完成',
    }
});
tabs.value.filter(el => !!+el.value).map(el => {
    displayOrderStatus.value[el.value] = el.title
    displayOrderStatusType.value[el.value] = el.type
})

export const useDataStore = defineStore('order', {
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
      detail: {} as OrderList,
      router: useRouter()
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
        this.getData()
    },
    async getData() {
      try {
        this.loading = true;
        const response: IResponseData<{ records?: Package[], page: Pagination }> = await queryData({ ...this.params, ...this.pageData });
        this.list = this.sortData(response.data?.records || []);
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
    sortData (data: Package[]) {
        let list = [] as Package[];
        data.map(({orderPackageEntriesVOList, orderEntriesVOList, ...el }) => {
            if (orderPackageEntriesVOList && orderPackageEntriesVOList.length) {
                let spanIndex = 0;
                let totalRows = orderPackageEntriesVOList.reduce((total, item) => total + (item.orderEntriesVOList?.length || 0), 0);
                orderPackageEntriesVOList.map((packageItem, packageIndex) => {
                    if (packageItem.orderEntriesVOList && packageItem.orderEntriesVOList.length) {
                        packageItem.orderEntriesVOList.map((orderGoods, index) => {
                            list.push({
                                ...el,
                                spanIndex: index,
                                packageIndex,
                                topSpanIndex: spanIndex,
                                topRows: totalRows,
                                orderEntriesVOList: packageItem.orderEntriesVOList,
                                childRows: packageItem?.orderEntriesVOList?.length || 0,
                                package: packageItem,
                                orderGoods
                            })
                            spanIndex++
                        })
                    }
                })
            } else {
                if (orderEntriesVOList && orderEntriesVOList.length) {
                    orderEntriesVOList.map((orderGoods, index) => {
                        list.push({
                            ...el,
                            orderEntriesVOList,
                            topSpanIndex: index,
                            topRows: orderEntriesVOList.length,
                            spanIndex: index,
                            childRows: orderEntriesVOList.length,
                            orderGoods
                        })
                    })
                }
            }
          }) || [];
          return list;
    },
    async getDetailData(params: {orderCode: string, soOrderCode: string}) {
        try {
            this.loading = true;
            const response: IResponseData<Package> = await queryDetailData({ ...params });
            if (response.success) {
                this.detail = response.data || {};
                this.list = this.sortData(([response.data]) as unknown as Package[]);
            }
            this.loading = false;
        } catch (error: any) {
          console.log('error useDataStore getData', error);
        }
    },
    buyAgain (row:any) {
        const submitStore = useSubmitStore();
        submitStore.setData({
            goodsList: row.orderEntriesVOList?.map(el => ({
                quantity: el.actualQty,
                goodsCode: el.goodsCode,
                goodsSkuCode: el.goodsSkuCode
            }))
        }).then(() => {
            this.router.push({
                path: '/order/submit',
                query: {
                    orderCode: row.package?.orderCode||row.orderCode,
                    soOrderCode: row.soOrderCode
                }
            })
        })
    }
  },
});
