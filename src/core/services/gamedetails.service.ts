import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class GamedetailsService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  

  game_app_details(appId:any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/app/details', JSON.stringify(appId), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  getSecretKey(appId:any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/app/get-secret', JSON.stringify(appId), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }


  getAppList(): Observable<any> {
    
    return this.http.get<any>(API_URL + '/v2/play/jet-admin/app-list?limit=100', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  getAppSummary(appId: any): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/jet-admin/app/summary/' + appId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

}
