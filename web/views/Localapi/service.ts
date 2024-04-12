import request from '@/utils/request';
export async function queryUser(uid: string): Promise<any> {
  return request({
    baseURL: import.meta.env.SSR
      ? `http://127.0.0.1:${process.env.MIDWAY_HTTP_PORT}`
      : '',
    url: '/api/user/get',
    method: 'get',
    params: {
      uid,
    },
  });
}
