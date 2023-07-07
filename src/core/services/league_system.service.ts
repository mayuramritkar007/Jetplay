import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LeagueSystemService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  // Disable Form
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

  // Enable Form
  enableForm(form: any) {
    Object.keys(form.controls).forEach(formKey => {
      const formValue = form.controls[formKey];
      if (formValue.value instanceof Array) {
        for (let index = 0; index < formValue.value.length; index++) {
          const fg = formValue.get([index]).parent;
          fg.enable();
        }
      }
    });
    form.enable();
  }


  // WWE League System Custom Module

  // Season
  //#region

  // List Of Season
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/league-system/season/list
  getLeagueSystemSeasonList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/league-system/season/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Create Season
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/season/create
  createLeagueSystemSeason(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/league-system/season/create',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Get Season Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/season/details/{{season_id}}?expand-reward=true
  getLeagueSystemSeasonDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/league-system/season/details/' + Id + '?expand-reward=true';
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
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/season/update/{{season_id}}
  updateLeagueSystemSeason(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/league-system/season/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  // Delete Season
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/season/delete
  deleteLeagueSystemSeason(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/league-system/season/delete';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
  }

  //#endregion


  // League
  //#region

  // Get League Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/current-details?expand-reward=true
  getLeagueSystemLeagueDetails(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/league-system/current-details?expand-reward=true';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Create League
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/create
  createLeagueSystemLeague(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/league-system/create',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Patch League
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/update/{{league_id}}
  patchLeagueSystemLeague(Id: string, data: object): Observable<any> {
    const url = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/league-system/update/' + Id;
    return this.http.patch<any>(url, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    });
  }

  // Delete League
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/delete
  deleteLeagueSystemLeague(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/league-system/delete';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
  }

  //#endregion
}
