export interface GoodsList {
    skuName?: string;
    goodsName?: string;
    goodsSkuCode?: string;
    imgUrl?: string;
    integralPrice?: string;
    integralUnit?: string;
}
export interface GoodsParams {
    currentPage?:number;
    goodsName?:string;
    pageSize?:number;
}
