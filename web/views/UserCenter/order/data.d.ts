export type OrderGoods = {
    "activityId": 572,
    "activityIntegral": null,
    "activityName": "试试",
    "activityTypeName": "拼团工具",
    "actualQty": 1,
    "canReturnOrder": false,
    "commentContent": "",
    "commentStatus": 0,
    "firstCategoryCode": "02",
    "firstCategoryName": "手机",
    "gift": false,
    "goodsCode": "2888888889220555",
    "goodsFaceValue": null,
    "goodsImageUrl": "https://img.yunzhonghe.com/image/1690958919811nLYVkqneSl.jpg",
    "goodsName": "八一手机！@@！#￥%{}？》&#*#（+；‘’—#*#&*（）（）*@（）%￥#……《》？》？》《 丹青",
    "goodsSkuCode": "2888888889190081",
    "goodsType": 1023,
    "id": 482242,
    "integralPrice": 21563,
    "isQuotaGoods": false,
    "lastCategoryCode": "020102",
    "lastCategoryName": "手机",
    "lmfGoodsModel": "",
    "merchantName": "",
    "orderCode": "838781864771194880",
    "originalQty": 1,
    "quotaIntrgral": null,
    "returnActualQty": null,
    "returnOrderCode": "",
    "returnOrderType": null,
    "saleCash": 0,
    "saleIntegral": 2200,
    "salePrice": 0,
    "secondCategoryCode": "0201",
    "secondCategoryName": "手机通讯",
    "specColorName": "颜色",
    "specColorValue": "丹青",
    "specSizeName": "",
    "specSizeValue": "",
    "supplyPrice": null,
    "surplusCash": 0,
    "surplusIntegral": 0,
    "target": "",
}
export type Package = {
    "actualQty": 1,
    "addressId": 419215,
    "buyerMsg": "",
    "customerId": 2888888888899354,
    "deliverContent": "请耐心等待，我们将尽快发货",
    "deliverWay": 1001,
    "estimatedDeliveryTime": null,
    "isAfterSale": false,
    "isDeleted": null,
    "memberAccount": "拼团二期A2",
    "memberId": 672128,
    "orderCode": "838781864771194880",
    "orderEntriesVOList": OrderGoods[],
    "packageCode": "838781864771194880",
    "packageStatus": 1007,
    "packageTotalAmount": 0,
    "packageTotalIntegral": 2200,
    "parcelConfirmTime": null,
    "parcelDeliverTime": null,
    "parcelShipperType": 1002,
    "parcelSignTime": null,
    "parentOrderCode": "PO838781864771194880",
    "remarks": "",
    "showExpeditedDeliveryBut": true,
    "soOrderCode": "SO838781864771194880",
    "supplierCode": "SP180662775562",
    "supplierId": 27,
    "supplierName": "南京桂花鸭（集团）有限公司",
    "supplierOrderCode": "",
    "syncBatchNo": "",
    "thirdOrderCode": "",
    "thirdParentOrderCode": "",
    "userDeleted": null,
    "warehouseCode": "0701",
    "warehouseName": "工厂代发仓",
    "websiteId": 2888888888890611
}
export interface OrderList {
    "activityId": null,
    "activityName": "",
    "address": "",
    "confirmTime": null,
    "createTime": "2024-04-26 14:19:41",
    "deliveOrderMo": "",
    "deliverCompany": "",
    "deliverTime": null,
    "displayOrderStatus": 1002,
    "estimatedDeliveryTime": null,
    "groupId": null,
    "id": 441253,
    "integralRatio": null,
    "integralUnit": "分",
    "invoiceStatus": null,
    "isCancelOrderAppUnderReview": false,
    "isPresale": false,
    "isRefunded": 0,
    "isReturnOrder": false,
    "isSplitOrder": false,
    "memberAccount": "拼团二期A2",
    "memberName": "拼团二期昵称A2",
    "orderCode": "838781864771194880",
    "orderDetailCodes": [
        "838781864771194880"
    ],
    "orderEntriesVOList"?: OrderGoods[],
    "orderGoodsSkuPortfolio": "",
    "orderGoodsType": 1023,
    "orderPackageEntriesVOList"?: Package[],
    "orderSource": null,
    "orderStatus": 1007,
    "orderStatusStr": "",
    "orderTotalAmount": 22,
    "parentOrderCode": "PO838781864771194880",
    "payStatus": 1002,
    "payType": 1001,
    "payWay": 1001,
    "phone": "",
    "presalePushStatus": 1001,
    "receiveName": "123231231231",
    "showExpeditedDeliveryBut": true,
    "showOrderGoodsPortfolioPrice": true,
    "soOrderCode": "SO838781864771194880",
    "totalPayCashAmount": 0,
    "totalPayIntegralAmount": 2200,
    "virtualOrder": 0,
    package: Package;
    orderGoods:OrderGoods,
    spanIndex: number | string
    topSpanIndex: number | string
    topRows: number | string
    childRows: number | string
}
export interface OrderParams {
    totalPage?:number;
    currentPage?:number;
    displayOrderStatus?:string|number|LocationQueryValue[];
    search?:string|null;
    sort?:string;
}