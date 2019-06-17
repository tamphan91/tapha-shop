import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map, catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserService, private dataService: DataService) {}

    login(email: string, passWord: string) {
        return this.userService.getUser(email, passWord).pipe(catchError((err: string) => [err] ), map(data => {
            // login successful if there's a jwt token in the response
            if (data['token']) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.dataService.addCurrentUser(data);
            }

            return data;
        }));
    }

    register(email: string, passWord: string, firstname: string, lastname: string) {
        return this.userService.saveUser(email, passWord, firstname, lastname).pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.dataService.addCurrentUser(data);
            }

            return data;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.dataService.addCurrentUser(null);
    }
}
