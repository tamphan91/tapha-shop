import { IItem } from './IItem';

export class Customer {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    shippingType: string;
    items: IItem[];
}
