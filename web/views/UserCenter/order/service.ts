import request from '@/utils/request';
export async function queryData(params): Promise<any> {
  return request({
    url: '/api/order/listByPage',
    method: 'get',
    params,
  });
}
export async function queryDetailData(data): Promise<any> {
    return request({
      url: '/api/order/orderDetail',
      method: 'post',
      data,
    });
  }
