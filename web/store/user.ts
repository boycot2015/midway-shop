import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
        loading: false,
        userInfo: {},
        token: ''
    };
  },
  actions: {
    async setUserInfo(data: any) {
        this.userInfo = data;
        this.token = data.token;
        this.loading = !!data.loading;
    },
  },
});
