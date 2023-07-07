import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CustomService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Berfi Custom API
  //#region

  // DropTable Segment API
  //#region
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/droptable/user-category/new

  createBerfiDTUserSegment(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/droptable/user-category/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/droptable/user-category/list

  getBerfiDTUserSegment(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/droptable/user-category/list', {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    }).pipe
      (
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/droptable/admin/subdrop/update/JACKPOT

  updateBerfiSubDT(SubDTid, data): Observable<any> {
    console.log('In service', SubDTid, data);

    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/update/' +
      SubDTid, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  //#endregion

  // Coin Multiplier API
  //#region
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/promotion/coin-multiplier/new

  createBerfiDropMultiplier(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/coin-multiplier/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/promotion/coin-multiplier/get

  getBerfiDropMultiplier(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/coin-multiplier/get', {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    }).pipe
      (
        map(this.extractData)
      );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/promotion/coin-multiplier/update/REST4_
  updateBerfiDropMultiplier(Id, data): Observable<any> {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/coin-multiplier/update/' +
      Id, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  //#endregion

  // Market API
  //#region

  getMarketConfigList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/configure

  createMarketConfig(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/configure',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Update Market Config
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/update/REST1_
  updateMarketConfig(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  // Get Probability Matrix List
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/probability-matrix/list
  getProbabilityMatrixList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/probability-matrix/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/probability-matrix
  // data:{
  //   "probability_data": [
  //     {
  //       "level": 1,
  //       "probability": { "INGREDIENT1": 40, "INGREDIENT2": 60 }
  //     }
  //   ]
  // }

  createProbabilityMatrix(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/probability-matrix/add',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot-dish-map/list

  getSlotDishMapList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/market/admin/slot-dish-map/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/market/admin/slot-dish-map
  //   {
  //   "input": [
  //     {
  //       "dish_unlocked": 1,
  //       "slot_dish_map": { "4": "DISH1", "5": "DISH1", "6": "DISH1", "7": "DISH1", "8": "DISH1" }
  //     },
  //   ]
  // }

  createSlotDishMap(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/slot-dish-map/add',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  //#endregion

  // Ad Placement API
  //#region

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/advertisement/advertise-list

  getAdPlacementList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/promotion/config
  createAdPlacement(data: any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/config',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/promotion/update/5e3c0cdb7294f87fb89cb206

  updateAdPlacement(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }


  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/promotion/delete/5e2fff8d2ef37e30949f1288

  deleteAdPlacement(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  //#endregion

  // MileStone API
  //#region

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/scores/admin/milestone/list
  getMilestoneList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/milestone/list', {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    }).pipe(
      map(this.extractData)
    );
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/scores/admin/milestone/add
  createMilestone(data: any): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/milestone/add',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/scores/admin/milestone/update/REST1_

  updateMilestone(id, data) {
    return this.http.put(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/milestone/update/' + id, data, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }

  //#endregion


  // SlotConfig API
  //#region

  // List Slot Config
  listSlotConfig(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/droptable/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Update Status
  updateSlotConfigStatus(id: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId')
      + '/custom/lootbox/admin/status/update/' + id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Create Slot Config
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/droptable/config
  createSlotConfig(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/droptable/config',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Update Slot Config
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/droptable/update/REST1_

  updateSlotConfig(Data, Id): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/droptable/update/' + Id, JSON.stringify(Data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }



  // Get Slot Config Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/droptable/get/REST1_
  getSlotConfigDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/droptable/get/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // delete SlotConfig
  deleteSlotConfig(id) {
    return this.http.delete(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/promotion/delete/' + id, {
      headers: new HttpHeaders().set(
        'Authorization', localStorage.getItem('LoggedInUser'))
    });
  }


  //#endregion


  // OrderBoard API
  //#region

  // List Slot Config
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/orderboard/config/list
  listOrderBoard(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/orderboard/config/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Get Order Board Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/orderboard/config/get/REST2_
  getOrderboardDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/orderboard/config/get/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Add Order Board
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/orderboard/config/new
  createOrderBoard(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/orderboard/config/new',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Update Slot Config
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/orderboard/config/update/REST2_

  updateOrderboard(Data, Name): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/orderboard/config/update/' + Name, JSON.stringify(Data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  //endregion


  //#endregion

  // PVP API
  //#region

  // LIST PVP API
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/chest/all
  listPVP(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/chest/all', {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Get PVP Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/orderboard/config/get/REST2_
  getPVPDetails(Id) {
    this.listPVP().subscribe(res => {
      return res.data.results.filter(x => x.id === Id);
    });
  }

  // POST PVP Details
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/chest/set
  postPVP(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/chest/set',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Delete PVP Details
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/chest/update/602d27416e239b8994c1731c/
  deletePVP(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/chest/update';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
  }


  //#endregion



  //#endregion

  // Ludo Custom API
  //#region

  // Ludo Milestone API

  // Create Milestone
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/milestones/create

  createLudoMilestone(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/milestones/create',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // Update Ludo Milestone
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/milestones/admin/update/{{milestone_id}}
  updateLudoMilestone(Data, Id): Observable<any> {
    return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/milestones/admin/update/' + Id, JSON.stringify(Data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  // List Milestone
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/milestones/list?enabled=True
  getLudoMilestoneList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/milestones/list?enabled=True&page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Delete Milestone
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/milestones/delete
  deleteLudoMilestone(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/milestones/delete';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      }),
      body: data
    };
    return this.http.delete<any>(URL, options);
  }

  //#endregion
}
