import { defineStore } from 'pinia';
import request from '@/utils/request';
export interface WebsiteProps {
  websiteConfig: {
    afterSaleSetting?: 1002;
    createTime?: null;
    creator?: '系统默认用户';
    creatorId?: 1;
    customerHotline?: '0775-8778733';
    customerId?: 2888888888899354;
    delete?: false;
    endStatusTime?: null;
    erpCode?: 'yzh-2888888888890611';
    id?: 2888888888890611;
    lastModifyTime?: null;
    lastOperator?: '系统';
    lastOperatorId?: 0;
    layoutTemplateId?: 0;
    lmfMallId?: null;
    openVisitors?: true;
    operationManager?: 0;
    payWay?: 2;
    saleType?: 1012;
    version?: 0;
    virtualPassageway?: '';
    websiteDomain?: 'cs0188';
    websiteLogo?: 'https://skycrane-oss.haoxiny.com/logo/dhsc.png';
    websiteName?: '测试01商城';
    websiteRatio?: 100;
    websiteRecordNumber?: '';
    websiteSource?: 1001;
    websiteStatus?: 1;
    websiteType?: 1;
    websiteUnit?: '分';
  };
  websitePage: {
    websitePcFixedList?: any[];
  };
  websiteCustomPage: {
    websitePcFixedList?: any[];
  };
}
export const useAppStore = defineStore('appStore', {
  state(): WebsiteProps {
    return {
      websiteConfig: {},
      websitePage: {},
      websiteCustomPage: {},
    };
  },
  actions: {
    async getWebsiteConfig() {
      const response = await request({
        url: '/api/website/info',
        method: 'get',
      });
      this.websiteConfig = response.data as WebsiteProps['websiteConfig'];
    },
    getWebsiteDecoration(
      params: { pageId?: string | number; pageType?: string | number } = {}
    ) {
      request({
        url: '/api/website/decoration',
        method: 'get',
        params,
      }).then(response => {
        if (params.pageId && params.pageType) {
          this.websiteCustomPage =
            response.data as WebsiteProps['websiteCustomPage'];
        } else {
          this.websitePage = response.data as WebsiteProps['websiteCustomPage'];
        }
      });
    },
  },
  persist: true,
});
