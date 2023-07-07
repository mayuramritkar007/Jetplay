import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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

export class LeaderboardService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  createLeaderBoard(data) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/leaderboard/admin/config/create', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getLeaderboardList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/leaderboard/admin/config/list?page=' + page +
      '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      });
  }

  getLeaderboard(id): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/leaderboard/admin/config/detail/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  changeLeaderboardStatus(id, data) {
    // console.log(data, "data")
    return this.http.patch(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/leaderboard/admin/config/status/update/' + id + '/', data, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      });
  }
}
