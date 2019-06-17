import { Injectable } from '@angular/core';
import { Observable, concat, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retryWhen, take, delay, tap, catchError } from 'rxjs/operators';
import { Product } from '../model/Product';
import { ProductDTO } from '../dto/ProductDTO';
import { environment } from '../../environments/environment';
import { HelperService } from '../helper/common.helper';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  attempts = 0;
  base_url = environment.apiUrl + `/products?_sort=id&_order=desc&`;
  base_url2 = environment.apiUrl + '/products/';

  constructor(private http: HttpClient, private helper: HelperService) { }

  getTopViewsProducts(productId: number, limit = environment.relativeImg_limit) {
    console.log('Get TopViewsProducts with id: ' + productId);
    return this.http.get<ProductDTO>(this.base_url + `&state_ne=0&_limit=${limit}&id_ne=${productId}&_page=`)
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
    , catchError(this.helper.handleError));
  }

  getProducts(productTypeId?: number, page?: number, searchString= null,
         limit= environment.limit, all = false): Observable<ProductDTO> {
    let url = this.base_url + `_limit=${limit}&_page=${page}`;
    if (productTypeId) {
      url += '&product_type_id=' + productTypeId;
    }
    if (searchString) {
      url += '&name_like=' + searchString;
    }
    if (!all) {
      url += '&state_ne=0';
    }
    return this.http.get<ProductDTO>(url)
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
    , catchError(this.helper.handleError));
  }

  editProduct(product: Product) {
    return this.http.put<Product>(this.base_url2 + product.id, product).pipe(catchError(this.helper.handleError));
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(this.base_url2, product).pipe(catchError(this.helper.handleError));
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.base_url2 + id + '?state_ne=0')
      .pipe(retryWhen(errors => concat(errors.pipe(delay(2000), tap(
        () => this.attempts++), take(5)), throwError(errors)))
    , catchError(this.helper.handleError));
  }
}
