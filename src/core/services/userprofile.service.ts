import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserprofileService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getUserList(searchStr: string, currentPage = 1, limit = 20): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile';
    // console.log('In select str user', searchStr, 'current Page', currentPage);
    return this.http.get<any>(API_URL + '/list?' + searchStr + '&page=' + currentPage + '&limit=' + limit, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(this.extractData)
    );
  }

  userLock(userLock:any): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile';
    // console.log('User Lock Data in services', userLock);
    return this.http.post<any>(API_URL + '/userlock', JSON.stringify(userLock), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  getSingleUser(userId: any): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile';
    // console.log('Userr id', typeof (userId));
    return this.http.get<any>(API_URL + '/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string,
        'player-id': userId
      })
    });
  }

  // URL:http://{{base_url}}/v2/play/{{app_id}}/profile/delete
  // Method: PUT

  deleteUser(userId:any, data = ''): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile/delete';
    return this.http.put<any>(API_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string,
        'player-id': userId
      })
    });
  }

  // URL:http://{{base_url}}/v2/play/{{app_id}}/social/friends
  // Method:GET

  getSocialFriendUser(userId: any): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/social/friends';
    // console.log('Userr id', typeof (userId));
    return this.http.get<any>(API_URL + '/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string,
        'player-id': userId
      })
    });
  }

  getSegmentList(currentPage = 1, limit = 20): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile/admin/file';
    // console.log('In select str user', searchStr, 'current Page', currentPage);
    return this.http.get<any>(API_URL + '/list?page=' + currentPage + '&limit=' + limit, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  exportSegmentList(data:any) {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile/admin/file/generate';
    return this.http.post<any>(API_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/storage/user-state/list/latest
  getUserStorage(userId:any) {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/storage/user-state/list/latest';
    // console.log('Userr id', typeof (userId));
    return this.http.get<any>(API_URL + '/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string,
        'player-id': userId
      })
    });
  }



  // LUDO CUSTOM
  //#region
  getSingleUserLudoScore(userId: any): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/' + localStorage.getItem('GameId') + '/profile/?with_score=true';
    // console.log('Userr id', typeof (userId));
    return this.http.get<any>(API_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string,
        'player-id': userId
      })
    });
  }
  //#endregion




}
