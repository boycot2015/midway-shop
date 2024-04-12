export interface GoodsList {
  title?: string;
  keywords?: string;
  description?: string;
  addtime?: string;
  content?: string;
}
export interface GoodsParams {
    currentPage?:number;
    goodsName?:string;
    pageSize?:number;
}
