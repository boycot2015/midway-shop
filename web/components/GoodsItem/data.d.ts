
import { Goods } from '@/@types/goods';
export interface GoodsItemProps extends Goods {
    size?: any; // small large mini, default: large
    layout?: string;// vertical horizontal, default: vertical
    border?: boolean;// border
    ellipsis?: boolean;// default: false
}
export interface GoodsParams {
    currentPage?:number;
    goodsName?:string;
    pageSize?:number;
    goodsSkuCodeList?:[]
}