import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { GoodsService } from '../../service/goods.service';
import { UserService } from '../../service/user.service';
@Controller('/api/goods')
export class APIController {

  @Inject()
  goodsService: GoodsService;

  @Inject()
  userService: UserService;

  @Get('/getGoodsByPage')
  async getGoodsByPage(
    @Query('goodsName') goodsName: string,
    @Query('pageSize') pageSize: string,
    @Query('categoryCode') categoryCode: string,
    @Query('brandCode') brandCode: string,
    @Query('currentPage') currentPage: string) {
    const res = await this.goodsService.getGoodsByPage({ goodsName, categoryCode, brandCode, pageSize, currentPage });
    return { ...res };
  }
  @Get('/getGoodsById')
  async getGoodsById(@Query('goodsCode') goodsCode = '888888888988010') {
    const user = await this.goodsService.getGoodsById({ goodsCode });
    return { success: true, message: 'OK', data: user };
  }
}
