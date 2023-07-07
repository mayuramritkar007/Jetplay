import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class GameconfigureService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  add_game_app(appData: any): Observable<any> {
    // console.log("After Subscribe", appData);
    // console.log("in add game header bdfdb function ", localStorage.getItem("LoggedInUser"));
    console.log('in add game app ', localStorage.getItem('LoggedInUser'));
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/app/register', JSON.stringify(appData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('LoggedInUser')}`
      })
    }).pipe(
      map(this.extractData)
    );
  }

  updateGameLogo(appId: string, secret: any, data: any): Observable<any> {
    const logoUrl = API_URL + '/v2/play/jet-admin/app/image/' + appId +
      '/set';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('LoggedInUser')}`,
        'secret-key': secret
      }),
    };
    return this.http.post<any>(logoUrl, data, options);
  }

  deleteGameLogo(appId: string, secret: any): Observable<any> {
    const logoUrl = API_URL + '/v2/play/jet-admin/app/image/' + appId +
      '/set';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('LoggedInUser')}`,
        'secret-key': secret
      }),
    };
    return this.http.delete<any>(logoUrl, options);
  }


  features(): Observable<any> {
    return this.http.get(API_URL + '/v2/play/jet-admin/modules/list');
  }

  updateModuleList(appId: any, updateGameConfig: any): Observable<any> {
    const url = API_URL + '/v2/play/jet-admin/app/update/' + appId;
    return this.http.put<any>(url, JSON.stringify(updateGameConfig), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('LoggedInUser')}`
      })
    });
  }
}


