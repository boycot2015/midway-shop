import { Inject, Controller, Get, Post, Query, Body } from '@midwayjs/core';
import { HttpService } from '@midwayjs/axios';
import { Context } from '@midwayjs/koa';
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;
  @Inject()
  httpService: HttpService;

  @Get('/*')
  async getApiData(@Query() params:any) {
    const result = await this.httpService.get(this.ctx.baseApiUrl + this.ctx.url.replace('api', ''), { params });
    return { ...result.data };
  }
  @Post('/*')
  async getApiPostData(@Body() params:any) {
    const result = await this.httpService.post(this.ctx.baseApiUrl + this.ctx.url.replace('api', ''), params);
    return { ...result.data };
  }
}
