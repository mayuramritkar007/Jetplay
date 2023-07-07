import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { GamedetailsService } from 'src/core/services/gamedetails.service';
import { SharingDataService } from 'src/core/services/SharingdataService.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public colCount:any = 4;
  // public user_apps_list = JSON.parse(this.storeData.getLocalStorage('current_user'));
  public app_list:any = [];
  subscribe:any = null;
  public base_url:any = null;
  public user:any = JSON.parse(this.storeData.getLocalStorage('current_user'));
  // public env = ev

  @ViewChild('grid')
  g!: ElementRef;

  constructor(
    public rest: GamedetailsService,
    public router: Router,
    public storeData: SharingDataService
  ) {
    localStorage.removeItem('current_game');
    localStorage.removeItem('GameId');
    localStorage.removeItem('GameKey');
    this.resize_item(window.innerWidth);
    // console.log();
  }

  ngOnInit() {
    const source = timer(0, 2000);
    this.subscribe = source.subscribe((val: any) => {
      this.RefreshAppList();
    });
    this.base_url = environment.apiUrl + '/v2/play/jet-admin/app/image/';
    console.log(this.base_url);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    this.resize_item(event.target.innerWidth);
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  resize_item(width: number) {
    if (width >= 1020) {
      this.colCount = 4;
    } else if (width > 768) {
      this.colCount = 3;
    } else if (width > 540) {
      this.colCount = 2;
    } else {
      this.colCount = 1;
    }
  }

  getStyle() {
    // console.log(this.colCount);
    const width:any = {
      1: '100% ',
      2: '50% ',
      3: '33% ',
      4: '25% '
    };
    const mystyle = {
      'margin-top': '0%',
      'display': 'inline-grid',
      'padding': '0px',
      'grid-template-columns': Array(this.colCount + 1).join(width[this.colCount])
    };
    return mystyle;
  }

  RefreshAppList() {
    this.rest.getAppList().subscribe((resp: any) => {
      if(resp.data.results!==undefined){
        this.app_list = resp.data.results;
      
      const not_created:any = this.app_list.filter((e:any) => e.created === false);
      if (not_created.length === 0) {
        this.subscribe.unsubscribe();
      }
      this.storeData.setLocalStorage('user_apps_list', JSON.stringify(resp.data.results));
      // localStorage.setItem('user_apps', JSON.stringify(resp.data.results));
      }
      
    });
  }

  GameDetails(app_id: string) {
    const app_details:any = {};
    app_details['app_id'] = app_id;
    localStorage.setItem('GameId', app_id);
    // localStorage.setItem('GameId', '10001');

    this.rest.getSecretKey(app_details).subscribe((secretKey: { data: { [x: string]: string; }; }) => {
      // console.log('In GetSecretKey', secretKey.data['secret_key']);
      localStorage.setItem('GameKey', secretKey.data['secret_key']);
      this.rest.game_app_details(app_details).subscribe((gameData: any) => {
        console.log('After response In Game Details in Home', gameData);
        // localStorage.setItem('Current game', JSON.stringify(gameData));
        this.storeData.setLocalStorage('current_game', JSON.stringify(gameData), 'home');
        // this.storeData.setLocalStorage('current_game', JSON.stringify(gameData));
        // this.router.navigated = false;
        this.router.navigate(['/dashboard']);
        // this.snackBar.open('Game Created Successfully', 'Dismiss', { duration: 3000 });
      });
    });

    // console.log('Game Application id', app_details);
  }

  

}
