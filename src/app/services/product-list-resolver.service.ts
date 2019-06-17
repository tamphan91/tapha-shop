import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ProductDTO } from '../dto/ProductDTO';
import { ProductService } from './product.service';

@Injectable()
export class ProductListResolverService implements Resolve<ProductDTO | string> {
    constructor(private productService: ProductService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | ProductDTO> {
        return this.productService.getProducts()
        .pipe(catchError((err: string) => [err] ));
    }
}
