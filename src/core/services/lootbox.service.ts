import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class LootboxService {

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

  // disablePartialForm(form: any, keys_list: any) {
  //   keys_list.forEach(element => {
  //     const form_value = form.controls[element];
  //     form_value.disable();
  //   });
  // }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/lootbox/admin/list

  listLootbox(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/lootbox/admin/list?page=' + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/lootbox/admin/status/update/5ed24f2c61fa13f6388f7c61
  updateLootboxStatus(id: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/custom/lootbox/admin/status/update/' + id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/lootbox/admin/create

  createLootbox(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/lootbox/admin/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/lootbox/admin/update/{{lootbox_id}}

  updateLootbox(lootboxId: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/lootbox/admin/update/' + lootboxId;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/lootbox/admin/fetch/5ec7a7d455d5c51d0916055e

  getLootboxDetails(lootboxId): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/lootbox/admin/fetch/' + lootboxId;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/delete

  // deleteLootboxDetails(data: any): Observable<any> {
  //   const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
  //     '/match/admin/rule/delete';
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: localStorage.getItem('LoggedInUser')
  //     }),
  //     body: data
  //   };
  //   return this.http.delete<any>(URL, options);
  // }

}
