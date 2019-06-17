import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ProductType } from '../model/ProductType';
import { ProductTypeService } from './producttype.service';

@Injectable()
export class ProductTypeListResolverService implements Resolve<ProductType[] | string> {
    constructor(private productTypeService: ProductTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | ProductType[]> {
        return this.productTypeService.getProductTypes()
        .pipe(catchError((err: string) => [err] ));
    }
}
