export interface GoodsParams {
    goodsCode?: string
    num?: number
    quantity?:number
    integralPrice?:number
    activityId?: number
    goodsSkuCode?: string
}
export interface OrderParams {
    addressId?: number,
    goodsList: GoodsParams[],
    shoppingCart: boolean
}
enum PayWay {
    1001 = '余额',
    1002 = '余额+现金'
}
enum PayMethod {
    1001 = '积分',
    1002 = '余额+现金'
}
export type PayData = {
    "failGoodsSkuList": [],
    "goodsSkuSalesAreaList": [],
    "integralUnit": "分",
    "orderCode": "848989738772205569",
    "parentOrderCode": "PO848989738772205569",
    "payCash": 0.01,
    "payComplete": false,
    "payIntegral": 499,
    "payMethodList": PayMethod[],
    "payStatus": 1001,
    "payWay": PayWay,
    "soOrderCode": "SO848989738772205569",
    "submitOrderToken": "B2C:ORDER:TOKEN:672128:1207189",
    "createTime": "2024-05-24 18:22:08",
    "displayOrderStatus": 1001,
    "goodsValidityTime": 0,
    "integralPayCardCode": "",
    "integralPayCardType": null,
    "integralPayUcId": "",
    "integralUnit": "分",
    "nbrmths": null,
    "orderCode": "848989738772205569",
    "orderDiscountTotalAmount": 0,
    "orderGoodsType": 1001,
    "orderStatus": 1001,
    "orderTotalAmount": 5,
    "parentOrderCode": "PO848989738772205569",
    "payStatus": 1001,
    "payType": 1002,
    "payTypeStr": "",
    "payWay": null,
    "paymentUrl": "",
    "returnUrl": "",
    "soOrderCode": "SO848989738772205569",
    "thirdOrderCode": "",
    "tokenId": "",
    "totalPayCashAmount": 0.01,
    "totalPayIntegralAmount": 499
}