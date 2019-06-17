import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, concat, zip, range, timer, pipe } from 'rxjs';
import { catchError, retryWhen, tap, map, delay, take, mergeMap } from 'rxjs/operators';
import { ProductType } from '../model/ProductType';
import { environment } from '../../environments/environment';
import { HelperService } from '../helper/common.helper';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  attempts = 0;
  message = '';
  constructor(private http: HttpClient, private helper: HelperService) { }
  base_url = environment.apiUrl + '/productTypes';
  backoff(maxTries, ms) {
    return pipe(
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(
          map(([i]) => i * i),
          mergeMap(i => timer(i * ms))
        )
      ), catchError(this.helper.handleError)
    );
  }
  getProductTypes(isHeader= true): Observable<ProductType[]> {
    // return this.http.get<ProductType[]>(this.base_url + '?_embed=productTypes&_sort=id&_order=desc')
      // .pipe(retryWhen(errors => zip(range(1, 3), throwError(errors))
      // .pipe(
      //   map(([i]) => i * i),
      //   mergeMap(i => timer(i * 1000))
      // )), catchError(this.helper.handleError));
    const url = this.base_url + '?_embed=productTypes&_sort=id&_order=desc' + (isHeader ? '&type=header' : '');
    return this.http.get<ProductType[]>(url)
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
        , catchError(this.helper.handleError));
  }

  getProductTypeById(id: number) {
    return this.http.get<ProductType>(this.base_url + '/' + id + '?_embed=productTypes')
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
        , catchError(this.helper.handleError));
  }

  saveProductType(productType: ProductType) {
    return this.http.post<ProductType>(this.base_url, productType).pipe(catchError(this.helper.handleError));
  }

  getProductTypeByName(searchString: string) {
    return this.http.get<ProductType[]>(this.base_url + '?q=' + searchString)
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
        , catchError(this.helper.handleError));
  }

  editProductType(productType: ProductType) {
    return this.http.put<ProductType>(this.base_url + '/' + productType.id, productType).pipe(catchError(this.helper.handleError));
  }

}
