
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class IntegrationService {


  constructor(private httpClient: HttpClient) { }


  createCommonAccount(social) {
    return this.httpClient.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/common/admin/app_configs/create', social, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  GetCommonAccount(keyVal = null) {
    let uri = '/v2/play/' + localStorage.getItem('GameId') + '/common/admin/app_configs';
    if (keyVal) {
      uri += '/' + keyVal;
    }
    return this.httpClient.get<any>(API_URL + uri, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }
}
