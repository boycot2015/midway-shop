export interface GoodsParams {
  currentPage: number;
  goodsName?: string;
  onlyInStock?: boolean | null;
  pageSize?: number;
}
