/**
 * 自定义 token 操作
 * @author Mr Zhang
 */
import { siteTokenKey } from '@/config/settings';

/**
 * 获取本地Token
 */
export const getToken = () => {
  //   let domain = window.location.pathname.split('/')[1];
  return !import.meta.env.SSR ? localStorage.getItem(siteTokenKey) : '';
};

/**
 * 设置存储本地Token
 */
export const setToken = (token: string) => {
  //   let domain = window.location.pathname.split('/')[1];
  !import.meta.env.SSR && localStorage.setItem(siteTokenKey, token);
};

/**
 * 移除本地Token
 */
export const removeToken = () => {
  !import.meta.env.SSR && localStorage.removeItem(siteTokenKey);
};
