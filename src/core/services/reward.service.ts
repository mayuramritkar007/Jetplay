import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getRewardList(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, options).pipe(
        map(this.extractData)
      );
  }


  getDailyRewardList(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/daily-rewards/admin/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, options).pipe(
        map(this.extractData)
      );
  }

  getActivityList(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, options);
  }

  createReward(rewardCreation): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/new', JSON.stringify(rewardCreation), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  createDailyReward(rewardCreation): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/daily-rewards/admin/new', JSON.stringify(rewardCreation), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  createActivity(activityCreation): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/new', JSON.stringify(activityCreation), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  getSingleReward(rewardid): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/' + rewardid, options).pipe(
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/daily-rewards/admin/get/{{daily_reward_id}}

  getDailyReward(rewardid): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/daily-rewards/admin/get/' + rewardid, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  getSingleActivity(activity_name): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/' + activity_name, options).pipe(
        map(this.extractData)
      );
  }

  updateReward(reward_data, reward_id): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/' + reward_id, JSON.stringify(reward_data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  updateActivity(activity_data, activity_name): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/' + activity_name, JSON.stringify(activity_data),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  deleteReward(rewardId): Observable<any> {
    return this.http.delete<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/' + rewardId + '?delete_type=soft',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  deleteActivity(activityName): Observable<any> {
    return this.http.delete<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/' + activityName,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

}
