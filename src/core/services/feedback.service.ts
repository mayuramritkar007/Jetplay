import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

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


  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/feedback/admin/list
  listFeedback(page = 1, limit = 1000, search = '', sort = ''): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/feedback/admin/list';
    return this.http.get<any>(URL + '/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/feedback/admin/new
  postFeedback(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/feedback/admin/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe
      (
        map(this.extractData)
      );
  }



  getFeedbackForm(id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/feedback/admin';
    return this.http.get<any>(URL + '/get/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/scores/admin/level-progression/update
  // updateFeedback(data): Observable<any> {
  //   return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/level-progression/update',
  //     JSON.stringify(data), {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: localStorage.getItem('LoggedInUser')
  //       })
  //     }).pipe
  //     (
  //       map(this.extractData)
  //     );
  // }


}
