import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, delay, catchError, tap } from 'rxjs/operators';
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

export class WalletService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getRegisteredCurrencies(page = 1, page_size = 20, sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/wallet/admin/currency/list?page='
      + page + '&limit=' + page_size + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        // delay(2000),
        map(this.extractData)
      );
  }

  getDefaultWallet(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/wallet/admin/default_wallet/get', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser')
      })
    });
  }

  registerValidCurrencies(currency_data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/wallet/admin/currency/add',
      JSON.stringify(currency_data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      });
  }

  updateCurrencyStatus(cur: String, user_status: Object): Observable<any> {
    // console.log('In service cur', cur);
    // console.log('In service', user_status);
    const url = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/wallet/admin/currency/' + cur + '/status/update';
    // console.log('url in service', url);
    return this.http.patch<any>(url, JSON.stringify(user_status), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser')
      })
    });
  }

  updateCurrencyInitialDeposit(cur: String, initial_deposit: Object): Observable<any> {
    // console.log('In service cur', cur);
    // console.log('In service', user_status);
    const url = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/wallet/admin/currency/' + cur + '/deposit/update';
    // console.log('url in service', url);
    return this.http.patch<any>(url, JSON.stringify(initial_deposit), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser')
      })
    });
  }

  updateUserWallet(userId: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/wallet/update';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser'),
        'player-id': userId
      })
    });
  }
}
