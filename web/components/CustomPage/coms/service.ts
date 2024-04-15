import request from '@/utils/request';
export async function queryData(params): Promise<any> {
  return request({
    url: '/api/website/queryGoodsInfoBySkuList',
    method: 'post',
    data: params,
  });
}
