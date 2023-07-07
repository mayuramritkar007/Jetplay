import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private http: HttpClient) { }

  // http://{{base_url}}/v2/play/jet-admin/app/{{app_id}}/get/config
  getAppConfigData() {
    return this.http.get<any>(API_URL + '/v2/play/jet-admin/app/' + localStorage.getItem('GameId') +
      '/get/config', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // http://{{base_url}}/v2/play/jet-admin/app/{{app_id}}/set/config
  postAppConfigData(data) {
    return this.http.post<any>(API_URL + '/v2/play/jet-admin/app/' + localStorage.getItem('GameId') +
      '/set/config', JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

}
