import { defineStore } from 'pinia';
import request from '@/utils/request';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
     websiteConfig: {},
     websitePage: {},
    };
  },
  actions: {
    async getWebsiteConfig () {
        let response = await request({
            url: '/api/website/info',
            method: 'get',
        });
        this.websiteConfig = response.data;
    },
    async getWebsiteDecoration () {
        let response = await request({
            url: '/api/website/decoration',
            method: 'get',
        });
        this.websitePage = response.data;
    }
  }
});
