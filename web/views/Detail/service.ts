import request from '@/utils/request';
export async function queryDetail(goodsCode: string): Promise<any> {
  return request({
    url: '/api/goods/queryGoodsDetail',
    method: 'post',
    data: {
        goodsCode: goodsCode,
        interestsCardLinkId: '',
        provinceId: 1,
        cityId: 1
    },
  });
}
export async function getGoodsCommentList(params: any): Promise<any> {
    return request({
      url: '/api/goodsComment/getGoodsCommentList',
      method: 'post',
      data: {
         ...params
      },
    });
  }
// goodsComment/getGoodsCommentList
