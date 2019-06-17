import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/Product';
import { ProductDTO } from '../dto/ProductDTO';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class RelationProductListResolverService implements Resolve<ProductDTO | string> {
    constructor(private productService: ProductService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | ProductDTO> {
        console.log('RelationProductListResolverService Loaded');
        return this.productService.getTopViewsProducts(route.params['id'])
        .pipe(catchError((err: string) => [err] ));
    }
}
