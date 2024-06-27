import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../../service/user.service';

@Controller('/api/user')
export class APIUserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: '操作成功！', data: user, code: 200 };
  }
}
