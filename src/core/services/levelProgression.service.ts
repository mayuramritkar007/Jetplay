import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class LevelProgressionService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/scores/level-progression/get
  getLevelProgression(page = 1, limit = 1000, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/level-progression/get', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe
      (
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/scores/admin/level-progression/set
  setLevelProgression(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/level-progression/set',
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


  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/scores/admin/level-progression/update
  updateLevelProgression(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/level-progression/update',
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


}
