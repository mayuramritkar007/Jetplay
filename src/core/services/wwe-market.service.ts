import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class WweMarketService {
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  disableForm(form: any) {
    Object.keys(form.controls).forEach(formKey => {
      const formValue = form.controls[formKey];
      if (formValue.value instanceof Array) {
        for (let index = 0; index < formValue.value.length; index++) {
          const fg = formValue.get([index]).parent;
          fg.disable();
        }
      }
    });
    form.disable();
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot/list

  getWWESlotConfigList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/slot/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        // delay(2000),
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/market/list

  getWWEMarketList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/market/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        // delay(2000),
        map(this.extractData)
      );
  }


  updateSlotStatus(id: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/custom/market/admin/slot/status-update/' + id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  updateMarketStatus(id: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/custom/market/admin/market/enable/' + id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot/create  

  createSlotConfig(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/slot/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/market/create

  createMarket(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/market/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot/view/{{slot_id}}

  getSlotConfigDetails(slotId): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/slot/view/' + slotId;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/fetch/current/market
  getMarketDetails(marketId): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/market/' + marketId;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/valid-item-list
  getRewardCategoryDetails(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/valid-item-list';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/market/update/{{market_id}}
  updateMarket(marketId: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/market/update/' + marketId;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot/update/{{slot_id}}
  updateSlotConfig(slotId: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/slot/update/' + slotId;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

}
