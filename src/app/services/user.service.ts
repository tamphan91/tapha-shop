import { Injectable } from '@angular/core';
import { Observable, concat, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retryWhen, take, delay, tap, catchError } from 'rxjs/operators';
import { IUser } from '../model/IUser';
import { environment } from '../../environments/environment';
import { HelperService } from '../helper/common.helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  attempts = 0;
  base_url = environment.apiUrl;
  constructor(private http: HttpClient, private helper: HelperService) { }

  getUser(email: string, passWord: string) {
    // let url = this.base_url;
    // url += '?email=' + email + '&password=' + passWord;
    // return this.http.get<IUser>(url).pipe(catchError(this.helper.handleError));
    return this.http.post<IUser>(this.base_url + '/login', { email: email, password: passWord })
    .pipe(catchError(this.helper.handleError),
      map(data => {
        // login successful if there's a jwt token in the response
        if (data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
        }

        return data;
      })
    );
  }

  saveUser(email: string, passWord: string, firstname: string, lastname: string) {
    return this.http.post<IUser>(this.base_url +
      '/users', {email: email, password: passWord, firstname: firstname, lastname: lastname})
    .pipe(catchError(this.helper.handleError));
  }
}
