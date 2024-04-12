import request from '@/utils/request';
export async function queryData(params): Promise<any> {
  return request({
    baseURL: import.meta.env.SSR
    ? `http://127.0.0.1:${process.env.MIDWAY_HTTP_PORT}`
    : '',
    url: '/api/website/queryGoodsInfoBySkuList',
    method: 'post',
    data: params,
  });
}
