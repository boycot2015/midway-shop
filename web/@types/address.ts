export interface Address {
    "aliasName": string
    "cityId": number
    "cityName": string
    "countyId": number
    "countyName":string
    "customerId": number
    "id": number
    "isDefault": boolean
    "memberId": number
    "provinceId": number
    "provinceName": string
    "receiverAddress": string
    "receiverName": string
    "receiverPhone": string
    "townId": number
    "townName": string
    "websiteId": number
}

export interface Region {
    "id": number
    "parentId": number
    "regionName": string
    "regionType": number
}