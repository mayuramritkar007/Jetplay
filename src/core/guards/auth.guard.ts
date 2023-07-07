import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TestService } from '../services/test.service';
import { SharingDataService } from '../services/SharingdataService.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  NoAppRequired = ['/home', '/gameconfigure', '/swagger', '/manageAccount'];


  constructor(
    private auth: AuthService,
    private myRoute: Router,
    private testService: TestService,
    private storeData: SharingDataService
    ) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const current_url = state.url;
    const current_module = current_url.split('/')[1];
    const mode = this.getDeepestTitle(next, 'mode');

    // console.log('mode in auth guard', mode);
    let permission_mode = 'read';
    if (mode === 'create' || mode === 'edit') {
      permission_mode = 'write';
    }
    if (this.auth.isLoggednIn()) {
      if (this.NoAppRequired.includes(current_url)) {
        if (current_url === '/manageAccount' || current_url === '/gameconfigure') {
          if (JSON.parse(this.storeData.getLocalStorage('current_user')).data.account_holder) {
            return true;
          } else {
            this.myRoute.navigate(['home']);
            return false;
          }
        } else {
          return true;
        }

      } else if (this.auth.hasApp() &&
        (this.testService.moduleExistorNot(current_module, permission_mode) || current_url === '/dashboard')) {
        return true;
      } else if (this.auth.hasApp()) {
        this.myRoute.navigate(['dashboard']);
        return false;
      } else {
        this.myRoute.navigate(['home']);
        return false;
      }
    } else {
      this.myRoute.navigate(['login']);
      return false;
    }
  }
  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot, key: any) {
    let title = routeSnapshot.data ? routeSnapshot.data[key] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild, key) || title;
    }
    return title;
  }
}
