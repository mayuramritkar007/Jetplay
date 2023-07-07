import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  public static data: any;
  public urlSearch: any = '';
  constructor() { }

  public getData(): any {
    return SharingDataService.data;
  }

  public getSearchDataUrl(): any {
    return this.urlSearch;
  }

  public setData(scope: any, url = ''): void {
    SharingDataService.data = scope;
    this.urlSearch = url;
    console.log('in set data', SharingDataService.data);
  }

  /**
   * Set Data to Local Storage
   */
  public setLocalStorage(key:any, val:any, func = 'monster') {
    const data:any = Crypto.AES.encrypt(val, 'monster@123');
    localStorage.setItem(key, data);
  }

  public getLocalStorage(key:any, func = 'monster') {
    const data:any = localStorage.getItem(key);
    const d = Crypto.AES.decrypt(data, 'monster@123').toString(Crypto.enc.Utf8);
    return d;
  }
}

