import request from '@/utils/request';
export async function queryUser(uid: string): Promise<any> {
  return request({
    url: '/api/user/get',
    method: 'get',
    params: {
      uid,
    },
  });
}
