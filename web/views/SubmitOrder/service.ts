import request from '@/utils/request';
import { OrderParams } from './data';
// shoppingcart/getActivityInfo /order/calcActivityDctInfo
export async function queryData(data:OrderParams): Promise<any> {
  return request({
    url: '/api/order/goSettlement',
    method: 'post',
    data,
  });
}
export async function getAddressData(params?:any): Promise<any> {
    return request({
      url: '/api/member/getMemberAddressList',
      method: 'post',
      params,
    });
}
export async function getProvinceData(): Promise<any> {
    return request({
      url: '/api/region/getAllProvice',
      method: 'get',
    });
}
export async function getRegionByParentId(parentId:string): Promise<any> {
    return request({
      url: '/api/region/getRegionByParentId',
      method: 'get',
      params: { parentId },
    });
}
export async function submit(data): Promise<any> {
    return request({
      url: '/api/order/submit',
      method: 'post',
      data,
    });
}
