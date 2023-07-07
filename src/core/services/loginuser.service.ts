import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const API_URL = environment.apiUrl;
const GAME_ID = localStorage.getItem('GameId');

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginuserService {

  constructor(private http: HttpClient) { }

  private extractDataLogin(res: Response) {
    const body = res;
    return body || {};
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/login', JSON.stringify(loginData), options).pipe(
      map(this.extractDataLogin)
    );
  }


  sendVerificationMail(mail: any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/verify/resend', JSON.stringify({ email: mail }), options).pipe(
      map(this.extractDataLogin)
    );
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/profile/user-list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

}

