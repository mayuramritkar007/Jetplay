import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  disableForm(form: any) {
    Object.keys(form.controls).forEach(form_key => {
      const form_value = form.controls[form_key];
      if (form_value.value instanceof Array) {
        for (let index = 0; index < form_value.value.length; index++) {
          const fg = form_value.get([index]).parent;
          fg.disable();
        }
      }
    });
    form.disable();
  }

  disablePartialForm(form: any, keys_list: any) {
    keys_list.forEach(element => {
      const form_value = form.controls[element];
      form_value.disable();
    });
  }


  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/list?name="search string"

  listMatchmaking(page = 1, page_size = 20, name = '', sort = ''): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/list?page=' + page + '&limit=' + page_size + '&name=' + name + '&sort=' + sort;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/status/update/{{rule_id}}/

  updateMatchmakingRuleStatus(rule_id: String, rule_status: Object): Observable<any> {
    console.log('In service cur', rule_id);
    console.log('In service', rule_status);
    const url = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/match/admin/rule/status/update/' + rule_id + '/';
    console.log('url in service', url);
    return this.http.patch<any>(url, JSON.stringify(rule_status), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/create

  createMatchmakingRule(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/update/{{rule_id}}/

  updateMatchmakingRule(rule_id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/update/' + rule_id + '/';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/match/admin/rule/detail/{{rule_id}}

  getRuleDetails(rule_id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/detail/' + rule_id;
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

  deleteRuleDetails(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/delete';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
  }

}
