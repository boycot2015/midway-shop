import { Configuration, App, IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';
import * as axios from '@midwayjs/axios';
import * as apiConfig from './config/config.api';
import * as staticFile from '@midwayjs/static-file';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
@Configuration({
  imports: [
    koa,
    validate,
    orm,
    axios,
    {
      component: staticFile,
      enabledEnvironment: ['production'],
    },
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady(container: IMidwayContainer) {
    const httpService = await container.getAsync(axios.HttpService);
    httpService.interceptors.request.use(
      config => {
        // Do something before request is sent
        if ((config.method === 'post' || config.method === 'put') && config.headers['Content-Type'] === 'application/json') {
            // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
            config.data = JSON.stringify(config.data)
        }
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    httpService.interceptors.response.use(
        response => {
          // Do something before response
          return response;
        },
        error => {
          // Do something with response error
          return Promise.reject(error);
        }
      );
    // 拓展context,集成baseApiUrl
    Object.defineProperties(this.app.context, {
        baseApiUrl: {
          value: apiConfig.default.baseUrl,
        },
      });
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
