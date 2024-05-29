import { App, Controller, Inject, Get, ContentType } from '@midwayjs/core';
import { Application, Context } from '@midwayjs/koa';
import { render } from '../vite.server';
@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  @Get('/cart')
  @Get('/login')
  @Get('/detail')
  @Get('/goodsDetail/goodsDetail')
  @Get('/localapi')
  @Get('/goodsList')
  @Get('/customPage')
  @Get('/about')
  @Get('/goods/*')
  @Get('/order/*')
  @Get('/userCenter/*')
  @Get('/404')
  @ContentType('text/html')
  async home(): Promise<void> {
    // return 'Hello Midwayjs!';
    this.ctx.body = render(this.ctx, this.app);
  }
}
