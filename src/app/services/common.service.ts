import { Injectable } from '@angular/core';
import { Observable, concat, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retryWhen, take, delay, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HelperService } from '../helper/common.helper';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  attempts = 0;
  base_url = environment.apiUrl;
  constructor(private http: HttpClient, private helper: HelperService) { }

  subscribe(email: string) {
    // return this.http.post(this.base_url + '/test', {email: email})
    // .pipe(catchError(this.helper.handleError));
    return this.http.post(this.base_url + '/mail/subscribe', { email: email })
      .pipe(delay(3000), catchError(this.helper.handleError));
  }

  checkout(customer: Customer) {
    return this.http.post(this.base_url + '/mail/checkout', { customer: customer })
      .pipe(delay(3000), catchError(this.helper.handleError));
  }

  send(email?: string, name?: string, subject?: string, message?: string) {
    // return this.http.post(this.base_url + '/test', {email: email})
    // .pipe(catchError(this.helper.handleError));
    return this.http.post(this.base_url + '/mail/send', { email: email })
      .pipe(catchError(this.helper.handleError));
  }

}
