export interface CategoryProps {
    categoryCode?:string|number;
    categoryName?:string;
    children?:CategoryProps[];
}