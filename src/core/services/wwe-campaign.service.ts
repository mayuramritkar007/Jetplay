import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';


const API_URL = environment.apiUrl;

@Injectable()
export class CampaignListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/race/list?page=' + 1 +
      '&limit=2000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class ChapterListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/chapters/list?page=' + 1 +
      '&limit=2000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}



@Injectable({
  providedIn: 'root'
})
export class WweCampaignService {
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


  // Campaign Config API
  //#region

  // Get Campaign List
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/campaign-config/list

  getWWECampaignList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/campaign-config/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  // Update Campaign Status
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/campaign-config/status/update/{{campaign_id}}
  updateStatus(Id: any): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/campaign-config/status/update/' + Id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  // Create Campaign
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/campaign-config/create

  createCampaign(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/campaign-config/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Get Champaign Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/campaign-config/{{campaign_id}}
  getCampaignDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/campaign-config/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Update Campaign Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/campaign-config/{{campaign_id}}
  updateCampaignDetails(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/campaign-config/' + Id;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }
  //#endregion

  // Acts API
  //#region
  // Get Acts List
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/acts/list

  getActsList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/acts/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  // Create Acts
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/acts/create

  createActs(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/acts/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Get Acts Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/acts/{{act_id}}
  getActsDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/acts/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Update Acts Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/acts/{{act_id}}
  updateActsDetails(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/acts/' + Id;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  //#endregion

  // Chapter API
  //#region

  // Get Chapters List
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/chapters/list

  getChaptersList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/chapters/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }

  // Create Chapter
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/chapters/create

  createChapter(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/chapters/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Get Chapter Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/chapters/{{chapter_id}}
  getChapterDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/chapters/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Update Chapter Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/chapters/{{chapter_id}}
  updateChapterDetails(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/chapters/' + Id;
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  //#endregion

  // Campaign Race API
  //#region

  // List of Campaign Race
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/race/list

  getCampaignRaceList(page = 1, pageSize = 20, name = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/campaign/admin/race/list?page='
      + page + '&limit=' + pageSize + '&search=' + name + '&sort=' + sort, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('LoggedInUser')
        })
      }).pipe(
        map(this.extractData)
      );
  }


  // Create Campaign Race
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/race/create
  createCampaignRace(data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/race/create';
    return this.http.post<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Get Champaign Race Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/race/{{race_id}}
  getCampaignRaceDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/race/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Update Campaign Race Details
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/custom/campaign/admin/race/update/{{race_id}}
  updateCampaignRaceDetails(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/custom/campaign/admin/race/update/' + Id;
    return this.http.put<any>(URL, JSON.stringify(data), {
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
