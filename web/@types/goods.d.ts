export interface Goods {
    skuName?: string;
    goodsName?: string;
    goodsCode?: string;
    goodsSkuCode?: string;
    imgUrl?: string;
    integralPrice?: string;
    integralUnit?: string;
}
export type GoodsSkuImage = {
    goodsCode: string
    goodsSkuCode: string
    imgGroupCode: string
    imgName: string
    imgUrl: string
    isMainImg: number
    sortValue: number
}
export type GoodsSkuSpec = {
    "goodsSkuCode": "2888888889071426",
    "id": 26000712042,
    "specName"?: "颜色",
    "specNameCode"?: "0",
    "specNameSort"?: 0,
    "specValue"?: "咖喱色",
    "specValueCode"?: "2888888888888889",
    "specValueSort"?: 0
}
type goodsSpec = {
    "nameSort": 0,
    "specId": "0",
    "specName": "颜色",
    "values": [
        {
            "valueId": "18",
            "valueName": "粉红色",
            "valueSort": 0
        },
        {
            "valueId": "2888888888888889",
            "valueName": "咖喱色",
            "valueSort": 0
        }
    ]
}
export interface Sku {
    "activityGoodsInfo": [],
    "addMode": 1001,
    "availableStock": 0,
    "barCode": "33876786",
    "categoryRate": 0,
    "discount": null,
    "discountRate": null,
    "downShelvesTime": null,
    "erpCode": "2888888889071426",
    "goodsCode": "2888888889071349",
    "goodsImages": [],
    "goodsSkuCode": "2888888889071426",
    "goodsSkuImage": GoodsSkuImage[],
    goodsSkuImgUrl?: string,
    quantity: number,
    "goodsSkuLabel": [],
    "goodsSkuName": "系统自有商品lzx0011 咖喱色",
    "goodsSkuSalesArea": [],
    "goodsSkuSpec": GoodsSkuSpec[],
    "goodsSkuStock": {
        "goodsSkuCode": "2888888889071426",
        "inventory": 16965,
        "lockNum": 0,
        "lowestNum": 0,
        "status": 1001,
        "usableNum": 16965
    },
    "goodsSkuTitle": "系统自有商品lzx0011",
    "goodsType": 1001,
    "hasEquityTask": false,
    "hidden": false,
    "id": 364267,
    "imgGroupCode": "2888888889318269",
    "includingFreight": false,
    "integralPrice": 31313,
    "interestsId": null,
    "interestsIntegralPrice": null,
    "interestsName": "",
    "interestsPrice": null,
    "isEnablePresale": false,
    "isMemberLevelGoods": false,
    "isOpenLadderPrice": false,
    "isQuotaGoods": false,
    "isSearchDisplay": 1,
    "ladderPriceGoodsList": [],
    "marketPrice": 15,
    "minimumOrderQuantity": 1,
    "modelNumber": "系统自有商品lzx0011",
    "originalIntegralPrice": 31313,
    "originalSellingPrice": 313.13,
    "paperWork": "",
    "profitRate": 0,
    "purchasedQuantity": 0,
    "quotaIntrgral": null,
    "restrictState": 1001,
    "restrictedQuantity": null,
    "rounding": false,
    "sellingPrice": 313.13,
    "shelvesStatus": 1001,
    "skuState": 1003,
    "sourceGoodsCode": "",
    "sourceGoodsSkuCode": "0",
    "supplyPrice": null,
    "thirdGoodsHasStock": false,
    "upShelvesTime": null
}