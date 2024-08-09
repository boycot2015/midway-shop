import { GoodsItemProps } from '../../GoodsItem/data.d';
export type List = {
  title?: string;
  linkUrl?: string;
  linkName?: string;
  pictureUrl: string;
  goodsSkuCodeList?: string[];
  goodsList?: GoodsItemProps[];
};
export type AssemblyContentProps = {
  groupList: List[];
};
export interface Props {
  assemblyContent: string;
}
