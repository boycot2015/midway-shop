/* eslint-disable prettier/prettier */
import { Provide, Inject } from '@midwayjs/core';
import { HttpService } from '@midwayjs/axios';
import { Context } from '@midwayjs/koa';
// import * as apiConfig from '../config/config.api';
@Provide()
export class GoodsService {
  @Inject()
  ctx: Context;
  @Inject()
  httpService: HttpService;
  prefix = '/goods';
  async getGoodsByPage(params?: any) {
    const url = this.ctx.baseApiUrl + this.prefix + '/getGoodsPage';
    const result = await this.httpService.get(url, { params });
    return { ...result.data };
  }
  async getGoodsById(params: { goodsCode: string }) {
    const url = this.ctx.baseApiUrl + this.prefix + '/queryGoodsDetail';
    const result = await this.httpService.post(url, params);
    return { ...result.data };
  }
}
