import { Goods } from '@/@types/goods';
import { Pagination } from '@/@types/page';
type goodsSkuImage = {
    goodsCode: string
    goodsSkuCode: string
    imgGroupCode: string
    imgName: string
    imgUrl: string
    isMainImg: number
    sortValue: number
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
    "goodsSkuImage": goodsSkuImage[],
    "goodsSkuLabel": [],
    "goodsSkuName": "系统自有商品lzx0011 咖喱色",
    "goodsSkuSalesArea": [],
    "goodsSkuSpec": [
        {
            "goodsSkuCode": "2888888889071426",
            "id": 26000712042,
            "specName": "颜色",
            "specNameCode": "0",
            "specNameSort": 0,
            "specValue": "咖喱色",
            "specValueCode": "2888888888888889",
            "specValueSort": 0
        }
    ],
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
type goodsAttribute = {
    "attributeCode"?: "987",
    "attributeName"?: "商品毛重",
    "attributeValueCode"?:"2888888888892361",
    "attributeValueName"?: "系统自有商品lzx0011",
    "groupCode"?:"620",
    "groupName"?:"无"
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
export interface GoodsDetail extends Goods {
    goodsDescribeDetail?: {
        goodsDescribe?:string;
        goodsThirdSpec?:string;
        goodsUrl?:string;
    },
    goodsSkuList: Sku[];
    "abbreviation"?: "",
    "brandCode"?: "3",
    "brandName"?: "美的",
    "density"?: 0,
    "exchangeMode"?: null,
    "extent"?: 10,
    "firstCategoryCode"?: "06",
    "firstCategoryName"?: "箱包类",
    "fragileGoods"?: false,
    "goodsAttributeList"?: goodsAttribute[],
    "goodsCharacteristic"?: "系统自有商品lzx0011",
    "goodsCode"?: "2888888889071349",
    "goodsName"?: "系统自有商品lzx0011",
    "goodsSpecList"?: goodsSpec[],
    "goodsTitle"?: "系统自有商品lzx0011",
    "goodsType"?: 1001,
    "goodsUnit"?: "个",
    "grossWeight"?: 0,
    "grossWeightUnit"?: "kg",
    "haveShelfLife"?: false,
    "height"?: 10,
    "isThirdGoods"?: false,
    "lastCategoryCode"?: "060304",
    "lastCategoryName"?: "拉杆箱",
    "modelNumber"?: "系统自有商品lzx0011",
    "oneSend"?: true,
    "portfolioGoodsList"?: [],
    "productPlace"?: "深圳",
    "rechargeProvider"?: "",
    "restrictions"?: false,
    "restrictionsNum"?: null,
    "returnGoodsRules"?: 1001,
    "returnGoodsRulesName"?: "不支持无理由退货",
    "salesNum"?: 0,
    "secondCategoryCode"?: "0603",
    "secondCategoryName"?: "功能箱包",
    "shelfLife"?: "0",
    "shelfLifeUnit"?: null,
    "showPrice"?: false,
    "sourceFrom"?: 1001,
    "start"?: false,
    "startNum"?: null,
    "supplierId"?: 762,
    "taxRate"?: 13,
    "taxRateDescription"?: "13%增值税",
    "thumbImage"?: "",
    "width"?: 10
}
type RateDataRecord = {
    "anonymous": false,
    "avgStar": 4,
    "content": "商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价商品评价",
    "createTime": "2024-05-17 14:08:20",
    "expressStar": 3,
    "goodsCode": "20230313180735",
    "goodsName": "李测试20230313 随机",
    "goodsNum": 1,
    "goodsSkuAttr": "颜色:随机",
    "goodsSkuCode": "20230313180735001",
    "goodsSkuImg": "https://skycrane3-oss-show.haoxiny.com/image/20230313/1678702042581HroNIfaiZD.jpg",
    "goodsStar": 4,
    "id": 194,
    "imgUrls": "https://skycrane-oss-show.haoxiny.com/image/20240517/1715926079094rUUqaaneza.jpg,https://skycrane-oss-show.haoxiny.com/image/20240517/1715926083564ZqvCcbUuqs.jpg,https://skycrane-oss-show.haoxiny.com/image/20240517/1715926088270wSYihweVjW.jpg",
    "integralUnit": "",
    "isCash": false,
    "isHate": false,
    "isLike": false,
    "memberAccount": "拼团二期A2",
    "memberAvatar": "",
    "memberId": 672128,
    "memberNickName": "拼****2",
    "numHates": 0,
    "numLikes": 0,
    "orderCode": "4172255812022313820",
    "orderDetailId": 480082,
    "parentOrderCode": "PO417225581202231382",
    "payPrice": null,
    "serviceStar": 4,
    "totalPrice": null,
    "unitPrice": null
}
export interface RateData {
    allNum?: number
    goodNum?: number
    goodPercent?: number
    negativeNum?: number
    normalNum?: number
    page?: Pagination,
    searchCount?: boolean,
    records?: RateDataRecord[]
}
