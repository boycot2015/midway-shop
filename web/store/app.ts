import { defineStore } from 'pinia';
import request from '@/utils/request';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      websiteConfig: {},
    };
  },
  actions: {
    async getWebsiteConfig () {
        let response = await request({
            baseURL: import.meta.env.SSR
            ? `http://127.0.0.1:${process.env.MIDWAY_HTTP_RORT || 8002}`
            : '',
            url: '/api/website/info',
            method: 'get',
        });
        this.websiteConfig = response.data;
    }
  }
});
