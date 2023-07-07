import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { UserIdleService } from 'angular-user-idle';

@Injectable()
export class AuthService {
  constructor(
    private myRoute: Router, 
    private dialogRef: MatDialog, 
    // private userIdle: UserIdleService
  ) { }

  sendToken(token: any) {
    localStorage.setItem('LoggedInUser', token);
  }

  getToken() {
    return localStorage.getItem('LoggedInUser');
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  hasApp() {
    return localStorage.getItem('GameId');
  }

  clearStorage() {
    // console.log('Clear Storage');
    localStorage.removeItem('LoggedInUser');
    localStorage.removeItem('current_user');
    localStorage.removeItem('current_game');
    localStorage.removeItem('GameId');
    localStorage.removeItem('GameKey');
    localStorage.removeItem('user_apps_list');
    localStorage.removeItem('app_summary');
    // localStorage.clear();
    // this.userIdle.resetTimer();
  }

  logout() {
    this.clearStorage();
    this.dialogRef.closeAll();
    this.myRoute.navigate(['login']);
  }

}
