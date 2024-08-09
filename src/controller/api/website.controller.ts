import { Inject, Controller, Get, Post, Query, Body } from '@midwayjs/core';
import { WebsiteService } from '../../service/website.service';
import { HttpService } from '@midwayjs/axios';
import { Context } from '@midwayjs/koa';
@Controller('/api/website')
export class APIWebsiteController {
  @Inject()
  ctx: Context;
  @Inject()
  httpService: HttpService;
  @Inject()
  websiteService: WebsiteService;
  @Get('/theme')
  async getWebsiteTheme() {
    const result = await this.websiteService.queryWebsiteTheme();
    return { ...result };
  }
  @Get('/decoration')
  async getWebsiteData(
    @Query('pageType') pageType = 1001,
    @Query('pageId') pageId = ''
  ) {
    const result = await this.websiteService.queryWebsitePcPage({
      pageType,
      pageId,
    });
    return { ...result };
  }
  @Get('/info')
  async getWebsiteInfoData() {
    const result = await this.websiteService.getWebsiteInfoData();
    return { ...result };
  }
  @Post('/queryGoodsInfoBySkuList')
  async queryGoodsInfoBySkuList(
    @Body('goodsSkuCodeList') goodsSkuCodeList = []
  ) {
    const result = await this.websiteService.queryGoodsInfoBySkuList({
      goodsSkuCodeList,
    });
    return { ...result };
  }
  @Get('/*')
  async getApiData(@Query() params: any) {
    const result = await this.httpService.get(
      this.ctx.baseApiUrl + this.ctx.url,
      { params }
    );
    return { ...result.data };
  }
  @Post('/*')
  async getApiPostData(@Body() params: any) {
    const result = await this.httpService.post(
      this.ctx.baseApiUrl + this.ctx.url,
      params
    );
    return { ...result.data };
  }
}
