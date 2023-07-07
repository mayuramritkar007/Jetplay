import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharingDataService } from './SharingdataService.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient, private storeData: SharingDataService) {
  }

  // http://{{base_url}}/v2/play/{{app_id}}/common/admin/variables

  listJetVaribles(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/common/admin/variables';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/common/admin/variables/update

  changeConfig(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/common/admin/variables/update';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // http://{{base_url}}/v2/play/{{app_id}}/common/admin/app_config/add/service-credentials

  add_service_credentials(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/common/admin/app_config/add/service-credentials';
    return this.http.post<any>(URL, data, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    });
  }

  checkModuleList(checkedList:any = []) {
    // const currGame = JSON.parse(localStorage.getItem('Current game'));
    console.log('in common');

    const currGame = JSON.parse(this.storeData.getLocalStorage('current_game'));
    const modulesList = currGame.data.modules;
    modulesList.push('currency');
    const sendList: any = [];
    if (checkedList.length > 0) {
      checkedList.forEach((element:any) => {
        if (modulesList.some((x:any) => x === element)) {
          if (element === 'inventory' && checkedList.includes('bundle')) {
            sendList.push(element);
            sendList.push('bundle');
          } else {
            sendList.push(element);
          }
        }
      });
    }
    return sendList;
  }
}
