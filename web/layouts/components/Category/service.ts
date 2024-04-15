import request from '@/utils/request';
export async function queryData(): Promise<any> {
  return request({
        url: '/api/getSalesCategory',
        method: 'get',
    });
}
export async function queryDataById(params: any): Promise<any> {
    return request({
          url: '/api/website/info',
          method: 'get',
          params,
      });
  }
