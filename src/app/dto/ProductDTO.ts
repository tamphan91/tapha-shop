import {Product} from '../model/Product';

export class ProductDTO {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
    data: Product[];
}
