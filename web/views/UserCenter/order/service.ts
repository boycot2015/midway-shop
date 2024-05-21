import request from '@/utils/request';
export async function queryData(params): Promise<any> {
  return request({
    url: '/api/order/listByPage',
    method: 'get',
    params,
  });
}
