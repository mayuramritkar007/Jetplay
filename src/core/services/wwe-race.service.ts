import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WweRaceService {
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(
    private http: HttpClient
  ) { }

  disableForm(form: any) {
    Object.keys(form.controls).forEach(formKey => {
      const formValue = form.controls[formKey];
      if (formValue.value instanceof Array) {
        for (let index = 0; index < formValue.value.length; index++) {
          const fg = formValue.get([index]).parent;
          fg.disable();
        }
      }
    });
    form.disable();
  }


  // Race Config
  //#region

  // Get Race List
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/race-modes/list

  getWWERaceList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/race/race-modes/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  // Update Status
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/race/race-modes/status-update/5eedfcc70b7ad989f78e123d
  updateStatus(Id: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/race-modes/status-update/' + Id;
    return this.http.put<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Create Race
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/race-modes/create

  createRace(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/race-modes/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Get Season Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/race-modes/5eedfcc70b7ad989f78e123d
  getRaceModeDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/race-modes/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Update Race Details
  updateRace(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/race-modes/update/' + Id;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Update Season

  // updateSeason(Id: any, data: any): Observable<any> {
  //   const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
  //     '/custom/market/admin/market/update/' + Id;
  //   return this.http.put<any>(URL, JSON.stringify(data), {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: localStorage.getItem('LoggedInUser')
  //     })
  //   }).pipe(
  //     map(this.extractData)
  //   );
  // }

  // // Delete Race
  // // {{schema}}://{{base_url}}/v2/play/{{app_id}}/league-system/season/delete
  // deleteData(data: any): Observable<any> {
  //   const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
  //     '/league-system/season/delete';
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: localStorage.getItem('LoggedInUser')
  //     }),
  //     body: data
  //   };
  //   return this.http.delete<any>(URL, options);
  // }

  //#endregion

  // XP Reward Config
  //#region

  // Get XP Reward Config
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/race/get/xp/reward
  getXpRewardDetails(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/get/xp/reward';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // POST XP Reward Config
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/race/set/xp/reward
  createXpReward(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/set/xp/reward';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  //#endregion

  // AI Difficulty
  //#region

  // Get AI Difficulty Config
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/get/ai-difficulty
  getAiDifficultyDetails(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/get/ai-difficulty';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // POST  AI Difficulty Config
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/set/ai-difficulty
  createAiDifficulty(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/set/ai-difficulty';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  //#endregion





  // Matchmaking
  //#region

  // Get Matchmaking
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/race/matchmaking/config/fetch
  getMatchmakingDetails(): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/matchmaking/config/fetch';
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // POST  Matchmaking
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/race/matchmaking/config/create
  createMatchmaking(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/race/matchmaking/config/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  //#endregion


}
