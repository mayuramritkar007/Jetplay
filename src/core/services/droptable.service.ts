import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

export class DropTableService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  SubDropTableList(page = 1, limit = 100, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe
      (
        map(this.extractData)
      );
  }

  DropTableList(page = 1, limit = 100, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe
      (
        map(this.extractData)
      );
  }

  updateDroptableStatus(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/status/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/new

  // createDroptable(DropTableCreation): Observable<any> {
  //   return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
  //     '/droptable/admin/new', JSON.stringify(DropTableCreation), {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Authorization': localStorage.getItem('LoggedInUser')
  //       })
  //     }).pipe(
  //       map(this.extractData)
  //     );
  // }

  // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/update/5c1741c27294f81988e4dbd6

  updateDropTable(DropTableData, DropTableId): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/droptable/admin/update/' + DropTableId, JSON.stringify(DropTableData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  getDropTable(DropTableId): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/droptable/admin/get/' + DropTableId, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  getSubdropTable(DropTableCode): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/get/' + DropTableCode, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/subdrop/new

  createSubDropTable(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/new

  createDropTable(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/subdrop/delete/COIN_DROP_NEW

  deleteSubDropItem(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  // http://{{base_url}}/v2/play/{{app_id}}/droptable/admin/delete/5c8b4d037294f81fa0e83df7
  deleteDropItem(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

}
