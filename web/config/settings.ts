/**
 * 站点配置
 * @author Mr Zhang
 */

/**
 * @description: 站点名称
 */
export const siteTitle = 'B2C商城';

/**
 * @description: 站点本地存储Token 的 Key值
 */
export const siteTokenKey = 'midway_token';

/**
 * @description: Ajax请求头发送Token 的 Key值
 */
export const ajaxHeadersTokenKey = 'Authorization';

/**
 * @description: Ajax返回值不参加统一报错的api地址
 */
export const ajaxResponseNoVerifyUrl: string[] = [
  '/user/login', // 用户登录
  '/user/info', // 用户信息
];

/**
 * @description: 平台用户登录的界面Url地址
 */
export const userLoginUrl = '/login';
