import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getInboxUserList(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
    const InboxURL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/admin';
    return this.http.get<any>(InboxURL + '/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  retreiveSingleMessage(msg_ref_id): Observable<any> {
    const InboxURL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/admin';
    return this.http.get<any>(InboxURL + '/message/' + msg_ref_id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  updateMessageContent(msg_ref_id, data): Observable<any> {
    console.log(msg_ref_id, data);
    const InboxURL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/admin';
    return this.http.put<any>(InboxURL + '/message/' + msg_ref_id, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  sendInboxBulk(data): Observable<any> {
    const InboxURL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/admin';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      }),
    };
    return this.http.post<any>(InboxURL + '/send/bulk', data, options);
  }

  userListInboxMessage(userId: any, currentPage = 1, limit = 10) {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inbox/?delete_status=not_deleted&page='
      + currentPage + '&limit=' + limit, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser'),
          'player-id': userId
        })
      });
  }

  deleteUserListInboxMessage(userId: any, msgId: any, deleteType: any) {
    return this.http.delete<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/delete/' + msgId + '?deleted_type=' + deleteType, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser'),
          'player-id': userId
        })
      });
  }

  sendSingleInboxMessage(data: any) {
    const InboxURL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/inbox/admin';
    return this.http.post<any>(InboxURL + '/send', JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
      })
    });
  }
}
