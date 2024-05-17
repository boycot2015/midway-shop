import { defineStore } from 'pinia';
import request from '@/utils/request';
interface WebsiteProps {
    websiteConfig: any;
    websitePage: {
        websitePcFixedList?: any[];
    };
    websiteCustomPage: {
        websitePcFixedList?: any[];
    };
}
export const useAppStore = defineStore('app', {
  state(): WebsiteProps {
    return {
     websiteConfig: {},
     websitePage: {},
     websiteCustomPage: {},
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
    async getWebsiteDecoration (params:{ pageId?: string | number, pageType?: string | number } = {}) {
        let response = await request({
            url: '/api/website/decoration',
            method: 'get',
            params
        });
        if (params.pageId && params.pageType) {
            this.websiteCustomPage = response.data as WebsiteProps['websiteCustomPage'];
        } else {
            this.websitePage = response.data as WebsiteProps['websiteCustomPage'];
        }
    }
  }
});
