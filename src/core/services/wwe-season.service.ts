import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class WweSeasonService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(
    private http: HttpClient
  ) { }

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

  // Get Season List
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/season/admin/list

  getWWESeasonList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/season/admin/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  // Create Season
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/season/admin/create/

  createSeason(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/season/admin/create/';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Get Season Details
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/season/admin/fetch/5eccde9a0779227087bf0929
  getSeasonDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/season/admin/fetch/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Update Season

  // updateSeason(Id: any, data: any): Observable<any> {
  //   const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
  //     '/custom/market/admin/market/update/' + Id;
  //   return this.http.put<any>(URL, JSON.stringify(data), {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: localStorage.getItem('LoggedInUser')
  //     })
  //   }).pipe(
  //     map(this.extractData)
  //   );
  // }




}
