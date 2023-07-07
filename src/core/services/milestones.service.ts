import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MilestonesService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Create Milestone
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/milestones/admin/create/

  createMilestone(data): Observable<any> {
    return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/milestones/admin/create/',
      JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }

  // List Milestone
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/milestones/admin/list
  getMilestoneList(page = 1, limit = 10, search = '', sort = ''): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/milestones/admin/list?page=' +
      page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
        headers: new HttpHeaders().set(
          'Authorization', localStorage.getItem('LoggedInUser'))
      }).pipe(
        map(this.extractData)
      );
  }

  // Get MileStone
  // { { schema } }://{{base_url}}/v2/play/{{app_id}}/milestones/admin/fetch/{{milestone_id}}
  getMilestoneDetails(Id): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/milestones/admin/fetch/' + Id;
    return this.http.get<any>(URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }

  // Update Milestone

  updateMilestone(Id: any, data: any): Observable<any> {
    const URL = API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/match/admin/rule/update/' + Id + '/';
    return this.http.put<any>(URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('LoggedInUser')
      })
    }).pipe(
      map(this.extractData)
    );
  }


  // Delete Milestone
  // {{schema}}://{{base_url}}/v2/play/{{app_id}}/milestones/delete
  deleteMilestone(data: any): Observable<any> {
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

}
