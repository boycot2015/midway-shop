import { defineStore } from 'pinia';
import { WebsiteProps } from './app';
import { setToken, removeToken } from '@/utils/localToken';
type PermissionCode = {
    "functionCode": "F000510",
    "functionDescribe": "",
    "functionLevel": null,
    "functionName": "",
    "functionSource": "",
    "functionTerminal": "",
    "functionType": null,
    "parentFunctionCode": "",
    "sort": null
}
type  UserInfo = {
    "account": "拼团二期A2",
    "activitySignPutModelOutputDTO": {
        "accessLink": "https://yx-show.haoxiny.com/signIn?activityCode=2023704133911570&mallPath=cs0188",
        "activityCode": "2023704133911570",
        "putModel": 0,
        "putModelImg": ""
    },
    "authLoginProtocol": 0,
    "authServer": null,
    "customMap": null,
    "deedVerificationCode": false,
    "email": "",
    "function": PermissionCode[],
    "headPortrait": "",
    "isActive": 1,
    "jobCode": "",
    "loginId": "400f5e5b24830c9af129abedc9ba35c98584405753af43a14fd94eaae7476969",
    "nickName": "拼团二期昵称A2",
    "phone": "",
    "realName": "",
    "redirectUrl": "",
    "role": null,
    "sex": null,
    "tokens": {
        "expireTime": "2024-06-19 14:17:55",
        "generateTime": "2024-05-20 14:17:55",
        "token": ""
    },
    "website": WebsiteProps['websiteConfig']
}
export const useUserStore = defineStore('user', {
  state: () => {
    return {
        loading: false,
        userInfo: {} as UserInfo,
        token: ''
    };
  },
  actions: {
    async setUserInfo (data: any) {
        this.userInfo = { ...this.userInfo, ...data };
        this.token = data.tokens?.token || this.token || '';
        setToken(this.token);
        this.loading = !!data.loading;
    },
    logout () {
        this.userInfo = {} as UserInfo;
        this.token = '';
        removeToken()
    }
  },
  persist: true,
});
