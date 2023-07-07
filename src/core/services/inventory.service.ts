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

export class InventoryService {

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }


  getItemClass(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item_class/list', {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getGlobalInventory(page = 1, limit = 1000, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/item/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe
      (
        map(this.extractData)
      );
  }

  resetGlobalUnits(itemId, data = {}): Observable<any> {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item/' +
      'global_units/reset/' + itemId, data, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      });
  }

  getInventory(id): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/item/get/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getBundlesList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/bundle/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  getBundle(id): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/bundle/get/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getStoreData(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/store/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }
  createStoreItem(data) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/store/new', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  getStore(id): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/store/get/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateStoreItem(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/store/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  createBundleItem(data) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/bundle/new', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateBundleItem(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/bundle/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateInventoryItem(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }


  deleteBundleItem(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/bundle/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateBundleStatus(data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/bundle/status/update', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  createInventoryItem(data) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item/new', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }


  deleteInventoryItem(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateInventoryStatus(data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/item/status/update', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  deleteStoreItem(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/store/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  updateStoreStatus(data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/admin/store/status/update', data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  userInventoryList(userId: any): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/user/get', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
        'player-id': userId
      })
    });
  }

  updateUserInventory(userId: any, itemId: any, operation: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/user/'
      + operation + '/item/' + itemId + '?debit_cost=false';

    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
        'player-id': userId
      })
    });
  }

  creditUserBundle(userId: any, bundleId: any) {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/user/credit/bundle/' + bundleId;
    return this.http.put<any>(URL, JSON.stringify(''), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser'),
        'player-id': userId
      })
    });
  }


  GetDefaultInventory(): Observable<any> {
    const uri = '/v2/play/' + localStorage.getItem('GameId') + '/common/admin/app_configs/DEFAULT_INVENTORY';
    return this.http.get<any>(API_URL + uri, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  createDefaultInventory(defaultInventory) {
    return this.http.post(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/common/admin/app_configs/create', defaultInventory, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

}
