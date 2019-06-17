import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/Product';
import { ProductDTO } from '../dto/ProductDTO';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment.prod';
import { DataService } from './data.service';

@Injectable()
export class RecentlyViewProductListResolverService implements Resolve<Product[]> {
    data: Product[];
    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] {
        const recentlyViewItems = sessionStorage.getItem('recentlyViews');
        this.data = JSON.parse(recentlyViewItems) || [];
        return this.data.filter(p => p.id !== Number(route.params['id']));
    }
}
