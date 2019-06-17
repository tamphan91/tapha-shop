import { Product } from './Product';

export class ProductType {
    id: number;
    name: string;
    description: string;
    title1: string;
    title2: string;
    url: string;
    product_type_id: number;
    // childrenIds: string;
    productTypes: ProductType[];
    // products: Product[];
}
