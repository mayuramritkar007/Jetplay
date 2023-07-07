
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class QuestsService {

  constructor(private http: HttpClient) {
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  create_quest(appData): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/quests/admin/new', JSON.stringify(appData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }
  update_quest(appData, achievementid): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/quests/admin/update/' + achievementid, JSON.stringify(appData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }
  add_goal_quest(appData, achievementid): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/quests/admin/' + achievementid + '/add-goal', JSON.stringify(appData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  getListQuests(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/quests/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }
  getSingleQuests(achievementid): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/quests/list?id=' + achievementid, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }
  createType(appData): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/quests/admin/type/new', JSON.stringify(appData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }
  getListType(page = 1, limit = 200, search = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/quests/admin/type/list?page=' + page + '&limit=' + limit + '&search=' + search, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  updateQuestStatus(appData, achievementid): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/quests/admin/status/update/' + achievementid, JSON.stringify(appData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

}

