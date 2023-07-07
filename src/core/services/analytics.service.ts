import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAnalyticsData(data) {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/analytics/graphite/test', JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

}
