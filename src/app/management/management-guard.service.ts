import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ManagementGuardService implements CanActivate {

    constructor(private router: Router) {}
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     this.router.navigate([''], { queryParams: { isLogin: false } });
    //     return false;
    // }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        if (state.url === '/management/payment') {
            const items = JSON.parse(localStorage.getItem('items'));
            return items && (items.length > 0);
        }
        if (currentUser) {
            if (state.url.includes('admin')) {
                return currentUser['email'] === 'tamphan91@icloud.com';
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate([''], { queryParams: { isLogin: false} });
        return false;
    }

}
