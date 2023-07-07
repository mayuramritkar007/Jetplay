import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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

export class RegisteruserService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  registerUser(adminData): Observable<any> {
    // console.log('After Subscribe', adminData);
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/register', JSON.stringify(adminData), options).pipe(
      map(this.extractData)
    );
  }
}
