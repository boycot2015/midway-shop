import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { WebsiteService } from '../../service/website.service';
@Controller('/api/website')
export class APIController {
  @Inject()
  websiteService: WebsiteService;
  @Get('/theme')
  async getWebsiteTheme() {
    const result = await this.websiteService.queryWebsiteTheme();
    return { ...result };
  }
  @Get('/decration')
  async getWebsiteData(@Query('pageType') pageType = 1001) {
    const result = await this.websiteService.queryWebsitePcPage({ pageType });
    return { ...result };
  }
  @Get('/info')
  async getWebsiteInfoData() {
    const result = await this.websiteService.getWebsiteInfoData();
    return { ...result };
  }
}
