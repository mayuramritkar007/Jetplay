import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;


@Injectable()
export class GlobalInventoryListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/item/list?page=' + 1 +
      '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class BundleListResolver implements Resolve<any> {
  constructor(private http: HttpClient) {
  }

  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/inventory/bundle/list?page=' + 1 +
      '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class CurrencyListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/wallet/admin/currency/list?page='
      + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class ScoreListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/scores/admin/score_param/list?page='
      + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class RewardsListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/rewards/list?page=' + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class ActivitiesListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') +
      '/rewards/admin/activity/list?page=' + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}


@Injectable()
export class SubdropTableListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/droptable/admin/subdrop/list?page=' +
      1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

@Injectable()
export class WWESlotConfigListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/market/admin/slot/list?page='
      + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}


@Injectable()
export class WWEListChallengeEventResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/challenges/events/list?page='
      + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}


@Injectable()
export class WWELootboxListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(): Observable<any> {
    return this.http.get<any>(API_URL + '/v2/play/' + localStorage.getItem('GameId') + '/custom/lootbox/admin/list?page='
      + 1 + '&limit=1000', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('LoggedInUser')
        })
      });
  }
}

