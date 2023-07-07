
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class AchievementsService {

    constructor(private http: HttpClient) {
    }
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    create_achievement(appData): Observable<any> {
        return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
            '/achievements/admin/new', JSON.stringify(appData), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }
    update_achievement(appData, achievementid): Observable<any> {
        return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
            '/achievements/admin/update/' + achievementid, JSON.stringify(appData), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }
    add_goal_achievement(appData, achievementid): Observable<any> {
        return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
            '/achievements/admin/' + achievementid + '/add-goal', JSON.stringify(appData), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }


    getListAchievements(page = 1, limit = 200, search = '', sort = ''): Observable<any> {
        return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
            + '/achievements/list?page=' + page + '&limit=' + limit + '&search=' + search + '&sort=' + sort, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }

    getSingleAchievement(achievementid): Observable<any> {
        return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
            + '/achievements/list?id=' + achievementid, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }

    createType(appData): Observable<any> {
        return this.http.post<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
            '/achievements/admin/type/new', JSON.stringify(appData), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }

    getListType(page = 1, limit = 200, search = ''): Observable<any> {
        return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId')
            + '/achievements/admin/type/list?page=' + page + '&limit=' + limit + '&search=' + search, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }

    updateAchievementStatus(appData, achievementid): Observable<any> {
        return this.http.put<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
            '/achievements/admin/status/update/' + achievementid, JSON.stringify(appData), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('LoggedInUser')
                })
            }).pipe(
                map(this.extractData)
            );
    }
}

