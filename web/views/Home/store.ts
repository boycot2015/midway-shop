import { defineStore } from 'pinia';
import request from '@/utils/request';
export const useDataStore = defineStore('websitePage', {
  state: () => {
    return {
      websitePage: {},
    };
  },
  actions: {
    async getWebsiteConfig () {
        let response = await request({
            baseURL: import.meta.env.SSR
            ? `http://127.0.0.1:${process.env.MIDWAY_HTTP_PORT}`
            : '',
            url: '/api/website/decoration',
            method: 'get',
        });
        this.websitePage = response.data;
    }
  }
});
