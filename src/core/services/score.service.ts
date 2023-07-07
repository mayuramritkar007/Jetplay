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

export class ScoreService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getRegisteredScores(page = 1, page_size = 20, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/score_param/list?page='
      + page + '&limit=' + page_size + '&seacrh=' + search + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        // delay(2000),
        map(this.extractData)
      );
  }

  updateUserScore(userId: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/set';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
        'player-id': userId
      })
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/scores/admin/score_param/add
  // Body: {
  //   "score_code": "RP",
  //   "initial_deposit": 1,
  //   "status": "ENABLE"
  // }

  addScoringParams(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/score_param/add';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      })
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/scores/admin/default_scores/get

  getDefaultScores(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/default_scores/get';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      })
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/scores/admin/score_param/{{score_code}}/status/update
  // Body:{"status": "DISABLE"}
  // QueryStringParam: ("score_code", "XP")

  updateScoringParamStatus(data: any, score_code: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/score_param/' + score_code + '/status/update';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      })
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/scores/admin/score_param/{{score_code}}/deposit/update
  // Body:{"initial_deposit": 100}
  // QueryStringParam: ("score_code", "xp")

  updateScoringParamInitialDeposit(data: any, score_code: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/score_param/' + score_code + '/deposit/update';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      })
    });
  }

}
