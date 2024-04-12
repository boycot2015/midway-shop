import { Provide, Inject } from '@midwayjs/core';
import { HttpService } from '@midwayjs/axios';
import { Context } from '@midwayjs/koa';
// import * as apiConfig from '../config/config.api';
@Provide()
export class WebsiteService {
  @Inject()
  ctx: Context;
  @Inject()
  httpService: HttpService;

  prefix = '/website';
  async queryWebsitePcPage(params: any) {
    const url = this.ctx.baseApiUrl + '/websitePc/queryWebsitePcPage';
    const result = await this.httpService.get(url, { params });
    return { ...result.data };
  }
  async queryWebsiteTheme() {
    const url = this.ctx.baseApiUrl + this.prefix + '/queryWebsiteTheme';
    const result = await this.httpService.get(url, { });
    return { ...result.data };
  }
  async getWebsiteInfoData() {
    const url = this.ctx.baseApiUrl + this.prefix + '/queryWebsiteInfo';
    const result = await this.httpService.get(url, { });
    return { ...result.data };
  }
  async queryGoodsInfoBySkuList(params: any) {
    const url = this.ctx.baseApiUrl + '/websitePc/queryGoodsInfoBySkuList';    
    const result = await this.httpService.post(url, params.goodsSkuCodeList);
    return { ...result.data };
  }
}
