export interface GoodsItemProps {
    size?: any; // small large mini, default: large
    layout?: string;// vertical horizontal, default: vertical
    ellipsis?: boolean;// default: false
    skuName?: string;
    goodsName?: string;
    goodsCode?: string;
    goodsSkuCode?: string;
    imgUrl?: string;
    integralPrice?: string|number;
    integralUnit?: string;
}
export interface GoodsParams {
    currentPage?:number;
    goodsName?:string;
    pageSize?:number;
    goodsSkuCodeList?:[]
}