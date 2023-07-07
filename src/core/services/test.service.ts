// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, from } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })

// export class TestService {

//   private headers_ser = {};

//   constructor(private http: HttpClient, private auth_service: AuthService) {
//     // this.headers_ser = this.auth_service.get_header();
//     // this.headers_ser.headers.headers.set("Authorization", [localStorage.getItem("LoggedInUser")]);
//     // this.headers_ser.normalizedNames.set("authorization", "Authorization");
//   }

//   private extractData(res: Response) {
//     const body = res;
//     return body || {};
//   }

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       console.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   // getProducts(): Observable<any> {
//   //   return this.http.get(url + "profile/user-list").pipe(
//   //     map(this.extractData));
//   // }

//   // addEnergy(consumeData): Observable<any> {
//   //   console.log("before call to serice ", consumeData);
//   //   return this.http.post<any>(url + "energy/consumeEnergy/", JSON.stringify(consumeData), this.auth_service.get_header()).pipe(
//   //     map(this.extractData)
//   //   );
//   // }

//   // updateEmail(updateEmailData): Observable<any> {
//   //   return this.http.put<any>(url + "profile/update-email", JSON.stringify(updateEmailData), this.auth_service.get_header()).pipe(
//   //     map(this.extractData)
//   //   );
//   // }


//   // add_game_app(appData): Observable<any> {
//   //   console.log('in add game app ', this.headers_ser);
//   //   return this.http.post<any>('http://127.0.0.1:8000/v2/play/jet-admin
//        /app/register', JSON.stringify(appData), this.headers_ser).pipe(
//   //     map(this.extractData)
//   //   );
//   // }

//   // features(): Observable<any> {
//   //   return this.http.get('http://127.0.0.1:8000/v2/play/jet-admin/modules/list').pipe(
//   //     map(this.extractData)
//   //   );
//   // }

//   // postData(consume): Observable<any> {
//   //   console.log("Consume data before service call ", consume)
//   //   return this.http.post<any>(url + "energy/consumeEnergy/", JSON.stringify(consume), this.auth_service.get_header()).pipe(
//   //     map(this.extractData));
//   // }

// }

// // const url = 'http://127.0.0.1:8000/v2/play/10001/';

// // const options = {
// //   headers: new HttpHeaders({
// //     'Content-Type': 'application/json',
// //   })
// // };

// // const httpOptions = {
// //   headers: new HttpHeaders({
// //     'Content-Type': 'application/json',
// //     'Authorization': 'my-auth-token'
// //   })
// // };


// // getProduct(id): Observable < any > {
// //   return this.http.get(endpoint + 'products/' + id).pipe(
// //     map(this.extractData));
// // }

// // addProduct(product): Observable < any > {
// //   console.log(product);
// //   return this.http.post<any>(endpoint + 'products', JSON.stringify(product), this.auth_service.get_header()).pipe(
// //     tap((product) => console.log(`added product w/ id=${product.id}`)),
// //     catchError(this.handleError<any>('addProduct'))
// //   );
// // }

// // updateProduct(id, product): Observable < any > {
// //   return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), this.auth_service.get_header()).pipe(
// //     tap(_ => console.log(`updated product id=${id}`)),
// //     catchError(this.handleError<any>('updateProduct'))
// //   );
// // }

// // deleteProduct(id): Observable < any > {
// //   return this.http.delete<any>(endpoint + 'products/' + id, this.auth_service.get_header()).pipe(
// //     tap(_ => console.log(`deleted product id=${id}`)),
// //     catchError(this.handleError<any>('deleteProduct'))
// //   );
// // }


import { Injectable } from '@angular/core';
import { SharingDataService } from './SharingdataService.service';


@Injectable()
export class TestService {
  // messages: string[] = [];
  public title: String='';
  public mode: String='';
  public event_type: String='';

  constructor(private storeData: SharingDataService) {
  }
  // addLog(message: string) {
  //   this.messages.push(message);
  //   // console.log('In log services', this.messages);
  // }

  // getLog() {
  //   return this.messages;
  // }

  // clear() {
  //   this.messages = [];
  // }

  getSubNavList(title: String) {

    let subList = [
      {
        title: 'rewards',
        path: '/rewards/reward',
        linkTitle: 'Reward'
      },
      {
        title: 'rewards',
        path: '/rewards/activity',
        linkTitle: 'Reward Map'
      },
      {
        title: 'rewards',
        path: '/rewards/daily_reward',
        linkTitle: 'Daily Reward'
      },
      {
        title: 'inventory',
        path: '/inventory/global-inventory',
        linkTitle: 'Global Inventory'
      },
      {
        title: 'inventory',
        path: '/inventory/bundle',
        linkTitle: 'Bundle'
      },
      {
        title: 'inventory',
        path: '/inventory/store',
        linkTitle: 'Stores'
      },
      {
        title: 'inventory',
        path: '/inventory/default-inventory',
        linkTitle: 'Default Inventory'
      },
      {
        title: 'userprofile',
        path: '/userprofile/userprofile',
        linkTitle: 'Userprofile'
      },
      {
        title: 'userprofile',
        path: '/userprofile/segment',
        linkTitle: 'Export Data'
      },
      {
        title: 'wallet',
        path: '/wallet/registered-currencies',
        linkTitle: 'Registered Currencies'
      },
      {
        title: 'wallet',
        path: '/wallet/default-wallet',
        linkTitle: 'Default Wallet'
      },
      {
        title: 'scores',
        path: '/scores/registered-scores',
        linkTitle: 'Registered Scores'
      },
      {
        title: 'scores',
        path: '/scores/default-scores',
        linkTitle: 'Default Scores'
      },
      {
        title: 'scores',
        path: '/scores/XPlevelprogression',
        linkTitle: 'XP Level Progression'
      },
      {
        title: 'quests',
        path: '/quests/list-quests',
        linkTitle: 'Quests'
      },
      {
        title: 'achievements',
        path: '/achievements/list-achievements',
        linkTitle: 'Achievements'
      },
      {
        title: 'inbox',
        path: '/inbox/messages',
        linkTitle: 'Message History'
      },
      {
        title: 'matchmaking',
        path: '/matchmaking/list-matchmaking',
        linkTitle: 'Matchmaking'
      },
      {
        title: 'drop table',
        path: '/drop_table/droptable',
        linkTitle: 'Droptable'
      },
      {
        title: 'drop table',
        path: '/drop_table/subdroptable',
        linkTitle: 'Sub Droptable'
      },
      {
        title: 'event',
        path: '/event/season',
        linkTitle: 'Season'
      },
      {
        title: 'event',
        path: '/event/league',
        linkTitle: 'League'
      },
      {
        title: 'milestones',
        path: '/milestones',
        linkTitle: 'Milestones'
      },
    ];

    // const curr_game = JSON.parse(localStorage.getItem('Current game'));

    let curr_game: any;
    localStorage.getItem('current_game') !== null ? curr_game = JSON.parse(this.storeData.getLocalStorage('current_game'))
      : curr_game = null;
    // const curr_game = JSON.parse(this.storeData.getLocalStorage('current_game'));
    // console.log('current game in test service', curr_game);

    if (curr_game !== null && curr_game !== undefined && curr_game.data.custom_modules.length !== 0) {
      curr_game.data.custom_modules.forEach((element:any) => {

        // SLOT SHEF CUSTOM MODULE
        //#region

        if (element.includes('DROP_TABLE_65539670-f138-4603-b63d-2a5292b309b2') && subList.some(x => x.linkTitle !== 'FTUE')) {
          subList = subList.filter(x => x.linkTitle !== 'Droptable');
          subList = subList.filter(x => x.linkTitle !== 'Sub Droptable');

          // console.log('Inside Droptable slot', subList);
          subList.push(
            {
              title: 'Slot Config',
              path: '/drop_table/cookingBlitz-slot_config',
              linkTitle: 'Slot Config'
            },
          );
        }

        if (element.includes('AD_PLACEMENT_3d0e70e4-07f5-4a2e-9870-fd2793de7d54') && subList.some(x => x.linkTitle !== 'Ad Placement')) {
          subList.push({
            title: 'ad placement',
            path: '/ad_placement',
            linkTitle: 'Ad Placement'
          }, {
              title: 'ad placement',
              path: '/ad_placement/coin_multiplier',
              linkTitle: 'Coin Multiplier'
            });
        }

        if (element.includes('SCORES_8fedae9c-65ca-4d58-a74a-18bd121d0795') && subList.some(x => !x.linkTitle.includes('Milestone'))) {
          subList.push({
            title: 'scores',
            path: '/scores/slot-milestone',
            linkTitle: 'Milestone/CustomerFeed'
          });
        }

        if (element.includes('MARKET_13cba4bc-0f77-4185-a510-4b2604f531fe') && subList.some(x => x.title !== 'market')) {
          subList.push(
            {
              title: 'market',
              path: '/market/market_config',
              linkTitle: 'Market Config'
            }
            // {
            //   title: 'market',
            //   path: '/market/probability_matrix',
            //   linkTitle: 'Probability Matrix'
            // },
            // {
            //   title: 'market',
            //   path: '/market/slot_dishes_map',
            //   linkTitle: 'Slot Dishes Map'
            // }
          );
        }

        if (element.includes('ORDER_BOARD_COOKINGBLITZ_e89eb265-dfd3-4af9-8b2e-94d2fb891c17')
          && subList.some(x => x.title !== 'order_board')) {
          subList.push(
            {
              title: 'Order Board',
              path: '/CookingBlitz-order_board/list-order_board',
              linkTitle: 'Order Board'
            }
          );
        }

        if (element.includes('PVP_COOKINGBLITZ_ea7d4bab-eee3-4f81-8e7d-1a1c6ec476d9')
          && subList.some(x => x.title !== 'PVP')) {
          subList.push(
            {
              title: 'PVP',
              path: '/CookingBlitz-pvp/list-pvp',
              linkTitle: 'PVP'
            }
          );
        }


        //#endregion

        // WWE CUSTOM MODULE
        //#region
        if (element.includes('LOOTBOX_c9ece79f-9c20-4b84-b426-08b1a30a25d3') && subList.some(x => x.title !== 'lootbox')) {
          subList.push(
            {
              title: 'lootbox',
              path: '/lootbox',
              linkTitle: 'Lootbox'
            });
        }

        if (element.includes('LEAGUE_SYSTEM_c7293c35-f0de-4475-9538-3fd6a1f1b811') && subList.some(x => x.title !== 'League System')) {
          subList.push(
            {
              title: 'League System',
              path: '/league_system/season/list',
              linkTitle: 'Season'
            },
            {
              title: 'League System',
              path: '/league_system/league',
              linkTitle: 'League'
            }
          );
        }

        if (element.includes('MARKET_WWE_9b45e942-8bf8-4731-b4e5-f5241bcfeea7') && subList.some(x => x.title !== 'Market')) {
          subList.push(
            {
              title: 'Market',
              path: '/wwe-market/list-slot-config',
              linkTitle: 'Slot Config'
            },
            {
              title: 'Market',
              path: '/wwe-market/list-market',
              linkTitle: 'Market'
            }
          );
        }

        if (element.includes('SEASON_WWE_42fb0ab2-eb50-4897-a17f-145f1d7235db') && subList.some(x => x.title !== 'Season')) {
          subList.push(
            {
              title: 'Season',
              path: '/wwe-season/season-list',
              linkTitle: 'Season'
            },
          );
        }

        if (element.includes('RACE_WWE_aba3b299-7bd2-4051-ac9b-cd8963282531') && subList.some(x => x.title !== 'Race')) {
          subList.push(
            {
              title: 'Race',
              path: '/wwe-race/race/list',
              linkTitle: 'Race Mode'
            },
            {
              title: 'Race',
              path: '/wwe-race/race/xp_reward_config',
              linkTitle: 'Xp Reward'
            },
            {
              title: 'Race',
              path: '/wwe-race/race/matchmaking',
              linkTitle: 'Matchmaking'
            },
            {
              title: 'Race',
              path: '/wwe-race/race/ai_difficulty',
              linkTitle: 'AI Difficulty'
            },
          );
        }

        if (element.includes('CAMPAIGN_WWE_6156f2f8-2f06-48ed-b8f7-7e20668d851f') && subList.some(x => x.title !== 'Campaign')) {
          subList.push(
            {
              title: 'Campaign',
              path: '/wwe-campaign/campaign/list',
              linkTitle: 'Campaign'
            },
            {
              title: 'Campaign',
              path: '/wwe-campaign/acts/list',
              linkTitle: 'Acts'
            },
            {
              title: 'Campaign',
              path: '/wwe-campaign/chapter/list',
              linkTitle: 'Chapter'
            },
            {
              title: 'Campaign',
              path: '/wwe-campaign/campaign_race/list',
              linkTitle: 'Campaign Race'
            },
          );
        }


        //#endregion
      });
    }

    // return (subList.filter(a => a.title.toLowerCase() === title.toLowerCase()));
    if (title) {
      return (subList.filter(a => a.title.toLowerCase() === title.toLowerCase()));
    }
    return [];
  }

  getTitleName() {
    return this.title;
  }

  setTitle(title: String) {
    this.title = title;
    // console.log('SETTING title ' + title);
  }


  setMode(mode: String) {
    this.mode = mode;
  }
  getMode() {
    return this.mode;
  }

  setEventType(event_type: String) {
    this.event_type = event_type;
  }
  getEventType() {
    return this.event_type;
  }

  moduleExistorNot(current_module:any, pem_type = 'read') {
    // console.log('in module exist or not func', JSON.parse(localStorage.getItem('Current game')).data.modules.includes(current_module));
    // const mo = JSON.parse(localStorage.getItem('Current game'));
    let mo: any;
    localStorage.getItem('current_game') !== null ? mo = JSON.parse(this.storeData.getLocalStorage('current_game'))
      : mo = null;
    if (mo.data.is_account_holder) {
      return true;
    }
    const permission_list = mo.data.permission;
    if (permission_list === undefined) {
      return false;
    } else {
      const pem = permission_list.filter((x:any) => x.module === current_module);
      if (pem.length > 0) {
        const customMoList = this.getCustomModuleList().map(x => x.moduleName);
        if (pem[0][pem_type] === true && (mo.data.modules.includes(current_module)
          || customMoList.includes(current_module))) {
          return true;
        }
      }
    }
    return false;
    // if (mo.data.permission !== undefined) {
    //   const l = mo.data.permission.map(x => x.module);
    //   if (l.length !== 0) {
    //     if (l.includes(current_module)) {
    //       const m = l.filter(x => x.module === current_module);
    //       if (m.length !== 0) {
    //         if (m[0].read === false) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     } else {
    //       return true;
    //     }
    //   }
    // } else {
    //   return mo.data.modules.includes(current_module);
    // }
  }

  getCustomModuleList() {
    const customModuleList = [
      {
        serverKey: 'MARKET_13cba4bc-0f77-4185-a510-4b2604f531fe',
        moduleName: 'market'
      },
      {
        serverKey: 'AD_PLACEMENT_3d0e70e4-07f5-4a2e-9870-fd2793de7d54',
        moduleName: 'ad_placement'
      },
      {
        serverKey: 'LOOTBOX_c9ece79f-9c20-4b84-b426-08b1a30a25d3',
        moduleName: 'lootbox'
      },
      {
        serverKey: 'LEAGUE_SYSTEM_c7293c35-f0de-4475-9538-3fd6a1f1b811',
        moduleName: 'league_system'
      },
      {
        serverKey: 'MARKET_WWE_9b45e942-8bf8-4731-b4e5-f5241bcfeea7',
        moduleName: 'wwe-market'
      },
      {
        serverKey: 'SEASON_WWE_42fb0ab2-eb50-4897-a17f-145f1d7235db',
        moduleName: 'wwe-season'
      },
      {
        serverKey: 'RACE_WWE_aba3b299-7bd2-4051-ac9b-cd8963282531',
        moduleName: 'wwe-race'
      },
      {
        serverKey: 'CAMPAIGN_WWE_6156f2f8-2f06-48ed-b8f7-7e20668d851f',
        moduleName: 'wwe-campaign'
      },
      {
        serverKey: 'ORDER_BOARD_COOKINGBLITZ_e89eb265-dfd3-4af9-8b2e-94d2fb891c17',
        moduleName: 'CookingBlitz-order_board'
      },
      {
        serverKey: 'PVP_COOKINGBLITZ_ea7d4bab-eee3-4f81-8e7d-1a1c6ec476d9',
        moduleName: 'CookingBlitz-pvp'
      }

    ];
    return customModuleList;
  }
}
