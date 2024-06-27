import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '123456789',
  koa: {
    port: 8002,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: 'mysql.sqlpub.com',
        port: 3306,
        username: 'boycot',
        password: 'VCZBHeSHbiTAxFkV',
        database: 'boycot',
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        // entities: [],

        // 或者扫描形式
        // entities: [
        //   '**/entity/*.entity{.ts,.js}'
        // ]
      }
    }
  },
  axios: {
    default: {
      // 所有实例复用的配置
    },
    clients: {
      // 默认实例的配置
      default: {
        // baseURL: 'https://api.example.com',
        // `headers` are custom headers to be sent
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Website-Path': 'ptsc39' // cs0188 DELL ptsc39
        },
        timeout: 15000, // default is `0` (no timeout)

        // `withCredentials` indicates whether or not cross-site Access-Control requests
        // should be made using credentials
        withCredentials: false, // default
      },
    }
  },
} as MidwayConfig;
