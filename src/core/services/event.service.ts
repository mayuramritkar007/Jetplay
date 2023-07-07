import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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

export class EventService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  createEvent(data) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/event/admin/config/create', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getEventList(page = 1, limit = 10, search = '', event_type = 'season', sort = '') {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/event/admin/config/' + event_type +
      '/list?page=' + page + '&limit=' + limit + '&name=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      });
  }

  updateEvent(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/event/admin/config/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  deleteEvent(id) {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('LoggedInUser')),
      body: { 'event_id': [id] }
    };
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/event/admin/config/delete', httpOptions);
  }

  getEvent(id) {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/event/admin/config/detail/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

}
