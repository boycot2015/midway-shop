export interface GoodsParams {
    goodsCode: string
    num?: number
    quantity?:number
    activityId: number
    goodsSkuCode: string
}
export interface OrderParams {
    addressId?: number,
    goodsList: GoodsParams[],
    shoppingCart: boolean
}