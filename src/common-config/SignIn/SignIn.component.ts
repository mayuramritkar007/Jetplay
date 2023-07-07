import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { LoginuserService } from 'src/core/services/loginuser.service';
import { SharingDataService } from 'src/core/services/SharingdataService.service';

@Component({
  selector: 'app-SignIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  @Input() loginData = {
    email: '',
    password: ''
  };
  
  constructor(
    private storeData: SharingDataService,
    public snackBar: MatSnackBar,
    private rest: LoginuserService,
    private router: Router,
    public auth: AuthService) {
    this.auth.clearStorage();
  }

  ngOnInit() {
  }

  login() {
    // console.log("Before login", this.loginData)
    this.rest.login(this.loginData).subscribe((response:any) => {
      if (response.status.code === 200) {
        if (response.data.token) {
          this.auth.sendToken(response.data.token);
          if (this.auth.isLoggednIn()) {
            // console.log("in login get token", this.auth.getToken());
            // localStorage.setItem('current user', JSON.stringify(response));
            this.storeData.setLocalStorage('current_user', JSON.stringify(response));
            // this.router.navigateByUrl('/home', { skipLocationChange: true });
            this.router.navigate(['home']);
            this.snackBar.open('Login successfully', 'Dismiss', { duration: 3000 });
          }
        } else if (response.data.email_verified === false) {
          const snackbar_action = this.snackBar.open('Email not verified!', 'Resend verification mail?', { duration: 60000 });
          snackbar_action.onAction().subscribe(a => {
            this.resend();
          });
        }
      } else {
        this.router.navigate(['login']);
        this.snackBar.open('Invalid Credentials', 'Dismiss', { duration: 3000 });
      }
    });
  }

  resend(): void {
    // console.log('CLICKED!', this.loginData.email);
    this.rest.sendVerificationMail(this.loginData.email).subscribe((response:any) => {
      if (response.status.code === 200) {
        this.snackBar.open('Verification Mail Sent!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
