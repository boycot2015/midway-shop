import { defineStore } from 'pinia';
import request from '@/utils/request';
import { CategoryProps } from './data.d';
import { IResponseData } from '@/@types/utils.request';
import { queryData, queryDataById } from './service';

export const useCategoryStore = defineStore('Category', {
  state(): { categoryList: CategoryProps[] } {
    return {
     categoryList: [],
    };
  },
  actions: {
    async getCategory () {
        const response: IResponseData<CategoryProps[]> = await queryData();
        this.categoryList = response.data || [];
    },
    async getCategoryByCode (params:{ categoryCode?: string | number } = {}) {
        const response:IResponseData<CategoryProps[]> = await queryDataById(params);
        this.categoryList.map((el:CategoryProps) => {
            if (el.categoryCode === params.categoryCode) {
                el.children = response.data
            }
        })
    }
  }
});
