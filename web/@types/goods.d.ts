export interface Goods {
    skuName?: string;
    goodsName?: string;
    goodsCode?: string;
    goodsSkuCode?: string;
    imgUrl?: string;
    soldOut?: boolean;
    integralPrice?: number|string;
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
    "goodsSkuCode": string,
    "id": number,
    "specName"?: string,
    "specNameCode"?: string,
    "specNameSort"?: number,
    "specValue"?: string,
    "specValueCode"?: string,
    "specValueSort"?: number
}
type goodsSpec = {
    "nameSort": 0,
    "specId": string,
    "specName": string,
    "values": [
        {
            "valueId": string,
            "valueName": string,
            "valueSort": number
        },
        {
            "valueId": string,
            "valueName": string,
            "valueSort": number
        }
    ]
}
export interface Sku {
    "activityGoodsInfo"?: [],
    "addMode"?: number,
    "availableStock"?: number,
    "barCode"?: string,
    "categoryRate"?: number,
    "discount"?: null,
    "discountRate"?: null,
    "downShelvesTime"?: null,
    "erpCode"?:string,
    "goodsCode"?:string,
    "goodsImages"?: [],
    "goodsSkuCode"?: string,
    "goodsSkuImage"?: GoodsSkuImage[],
    goodsSkuImgUrl?: string,
    quantity: number,
    "goodsSkuLabel"?: [],
    "goodsSkuName"?: string,
    "goodsSkuSalesArea"?: [],
    "goodsSkuSpec"?: GoodsSkuSpec[],
    "goodsSkuStock"?: {
        "goodsSkuCode"?: string,
        "inventory"?: number,
        "lockNum"?: number,
        "lowestNum"?: number,
        "status"?: number,
        "usableNum"?: number
    },
    "goodsSkuTitle"?: string,
    "goodsType"?: number,
    "hasEquityTask"?: boolean,
    "hidden"?: boolean,
    "id"?: number,
    "imgGroupCode"?: string,
    "includingFreight"?: boolean,
    "integralPrice": number | string,
    "interestsId"?: null,
    "interestsIntegralPrice"?: null,
    "interestsName"?: string,
    "interestsPrice"?: null,
    "isEnablePresale"?: boolean,
    "isMemberLevelGoods"?: boolean,
    "isOpenLadderPrice"?: boolean,
    "isQuotaGoods"?: boolean,
    "isSearchDisplay"?: number,
    "ladderPriceGoodsList"?: [],
    "marketPrice"?: number,
    "minimumOrderQuantity"?: number,
    "modelNumber"?: string,
    "originalIntegralPrice"?: number,
    "originalSellingPrice"?: number,
    "paperWork"?: string,
    "profitRate"?: number,
    "purchasedQuantity"?: number,
    "quotaIntrgral"?: null,
    "restrictState"?: number,
    "restrictedQuantity"?: null,
    "rounding"?: boolean,
    "sellingPrice"?: number,
    "shelvesStatus"?: number,
    "skuState"?: number,
    "sourceGoodsCode"?: string,
    "sourceGoodsSkuCode"?: string,
    "supplyPrice"?: null,
    "thirdGoodsHasStock"?: boolean,
    "upShelvesTime"?: null
}