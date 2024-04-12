export interface GoodsItemProps {
    size?: string;// small large mini, default: large
    layout?: string;// vertical horizontal, default: vertical
    ellipsis?: boolean;// default: false
    skuName?: string;
    goodsName?: string;
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