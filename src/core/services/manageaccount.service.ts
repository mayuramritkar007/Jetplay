import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ManageAccountService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  addNewMember(data: any) {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/add/user';
    return this.http.post(API_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    });
  }

  // +'?page=' +page + '&limit=' + limit + '&search=' + search + '&sort=' + sort
  getMemberList(page = 1, limit = 500, search = '', sort = ''): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/list/users?page=' + page + '&limit=' + limit;
    return this.http.get<any>(API_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  updateUserStatus(user_status: any): Observable<any> {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/update/user/status';
    return this.http.put<any>(API_URL, JSON.stringify(user_status), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  addNewGamePermission(data: { app_id: any; }, user_id: string) {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/permit/game/';
    return this.http.put(API_URL + user_id, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    });
  }

  deleteGamePermission(data: { app_id: any; }, user_id: string) {
    const URL = environment.apiUrl + '/v2/play/jet-admin/permit/game/' + user_id;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
    // const API_URL = environment.apiUrl + '/v2/play/jet-admin/permit/game/';
    // return this.http.delete<any>(API_URL + user_id, JSON.stringify(data), {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem('LoggedInUser')
    //   })
    // });
  }

  getUserGameModulePermission(app_id: { toString: () => string; }, user_id: string) {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/list/module-permission/' + app_id.toString() + '/' + user_id;
    return this.http.get<any>(API_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    }).pipe(
      map(this.extractData)
    );
  }

  setUserGameModulePermission(data: { app_id: any; permission: any; }, pem_id: string) {
    const API_URL = environment.apiUrl + '/v2/play/jet-admin/update-module-permission/' + pem_id;
    // return this.http.get<any>(API_URL, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem('LoggedInUser')
    //   })
    // }).pipe(
    //   map(this.extractData)
    // );
    return this.http.put(API_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser') as string
      })
    });
  }

  getFinalPermissions(modules:any, permissionList:any, isAdmin:any) {
    const newPermissionList = [];
    for (const e of modules) {
      const pem = permissionList.filter((x:any) => x.module === e);
      if (pem.length > 0) {
        newPermissionList.push(pem[0]);
      } else {
        newPermissionList.push({
          module: e,
          read: isAdmin,
          write: isAdmin
        });
      }
    }
    return newPermissionList;
  }

}
