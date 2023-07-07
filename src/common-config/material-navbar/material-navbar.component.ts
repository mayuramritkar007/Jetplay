import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/core/services/auth.service';
import { GamedetailsService } from 'src/core/services/gamedetails.service';
import { SharingDataService } from 'src/core/services/SharingdataService.service';
import { TestService } from 'src/core/services/test.service';
// import { ManageAccountService } from '../services/manageaccount.service';
// import * as version from '../../../../package.json';


@Component({
  selector: 'app-material-navbar',
  templateUrl: './material-navbar.component.html',
  styleUrls: ['./material-navbar.component.css']
})
export class MaterialNavbarComponent implements OnInit {



  public adminData = JSON.parse(this.storeData.getLocalStorage('current_user'));
  public gameData: any;
  // public gameData = JSON.parse(localStorage.getItem('Current game'));

  // public ver = version;
  public products: any;
  public userlist: any;
  public next: any;
  public current_game_module: any;

  public admin_first_name: any;
  public app_list: any = [];
  public app_list_name: any = [];
  public module_list: any = [];
  public permission_list: any = [];
  public mobile: boolean = false;
  public heading: string = '';


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    public auth: AuthService,
    public rest: GamedetailsService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private test: TestService,
    private gameDetailService: GamedetailsService,
    private storeData: SharingDataService) {

    localStorage.getItem('current_game') !== null ? (this.gameData = JSON.parse(this.storeData.getLocalStorage('current_game')))
      : this.gameData = null;

    if (localStorage.getItem('current_game') !== null) { this.game_modules_list(); }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    // router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.game_app_list();

    if (window.innerWidth < 768) { // 768px portrait
      this.mobile = true;
    }
    this.router.events.subscribe((event) => {
      this.setTitle();
    });
    this.setTitle();
  }

  setTitle(): void {
    const title = this.test.getTitleName();
    if (title && title !== undefined) {
      this.heading = title.toString();
    } else {
      this.heading = '';
    }
  }

  game_app_list(): void {
    this.gameDetailService.getAppList().subscribe(resp => {

      this.app_list = resp['data'].results;
      if (this.app_list !== undefined) {
        this.storeData.setLocalStorage('user_apps_list', JSON.stringify(this.app_list));
        // localStorage.setItem('user_apps', JSON.stringify(this.app_list));
        this.app_list.forEach((element: any) => {
          if (element.created) {
            this.app_list_name.push(element);
          }
        });
      }

    });
  }

  game_modules_list() {
    console.log('In Game Modules', this.gameData);
    // let game_details = JSON.parse(localStorage.getItem('Current game'));
    let game_details = JSON.parse(this.storeData.getLocalStorage('current_game', 'material'));
    if (game_details === null) {
      game_details = {};
      // console.log('Empty module list');
    } else {
      this.module_list = game_details.data.modules;
      const custom_module = game_details.data.custom_modules;

      this.permission_list = game_details.data.permission;
      if (this.permission_list === undefined) {
        this.permission_list = [];
      }
      const new_permission_list = [];

      const customModuleList = this.test.getCustomModuleList();

      if (custom_module.length !== 0) {
        customModuleList.forEach(e => {
          if (custom_module.includes(e.serverKey)) {
            this.module_list.push(e.moduleName);
          }
        });
      }

      for (const e of this.module_list) {
        const pem = this.permission_list.filter((x: any) => x.module === e);
        if (pem.length > 0) {
          new_permission_list.push(pem[0]);
        } else {
          new_permission_list.push({
            'module': e,
            'read': game_details.data.is_account_holder,
            'write': game_details.data.is_account_holder
          });
        }
      }
      this.permission_list = new_permission_list;

      // const pem_module_list = this.permission_list.map(x => x.module);
      // for (const e of this.module_list) {
      //   if (!pem_module_list.includes(e)) {
      //     this.permission_list.push({
      //       'module': e,
      //       'read': true,
      //       'write': true
      //     });
      //   }
      // }

      this.permission_list.forEach((element: any) => {
        if (element.read === false) {
          this.module_list.splice(this.module_list.indexOf(element.module), 1);
        }
      });
      // console.log('selected game module list', this.module_list);
    }
  }

  logout(): void {
    this.auth.logout();
  }

  GameDetails(app_id: any) {
    if (app_id === localStorage.getItem('GameId')) {
      return false;
    }
    localStorage.removeItem('Current game');
    // localStorage.removeItem('current_game');
    const app_details: any = {};
    app_details['app_id'] = app_id;
    localStorage.setItem('GameId', app_id as string);
    // console.log('Game Application id', app_details);
    this.rest.getSecretKey(app_details).subscribe((secretKey) => {
      // console.log('In GetSecretKey', secretKey.data['secret_key']);
      localStorage.setItem('GameKey', secretKey.data['secret_key']);
      this.rest.game_app_details(app_details).subscribe((gameData) => {
        // console.log('After response In Game Details', gameData);
        // localStorage.setItem('Current game', JSON.stringify(gameData));
        this.storeData.setLocalStorage('current_game', JSON.stringify(gameData), 'nav');
        console.log('Currenct Game', localStorage);

        this.gameData = gameData;
        this.router.navigate(['dashboard']);
        this.game_modules_list();
      });
    });
    return true;
  }

  toggleTheme(): void {
    // if (this.overlay.getContainerElement().classList.contains('custom-theme')) {
    //   this.overlay.getContainerElement().classList.remove('custom-theme');
    //   this.overlay.getContainerElement().classList.add('light-custom-theme');
    // } else if (this.overlay.getContainerElement().classList.contains('light-custom-theme')) {
    //   this.overlay.getContainerElement().classList.remove('light-custom-theme');
    //   this.overlay.getContainerElement().classList.add('custom-theme');
    // } else {
    //   this.overlay.getContainerElement().classList.add('light-custom-theme');
    // }

    if (document.body.classList.contains('custom-theme')) {
      document.body.classList.remove('custom-theme');
      document.body.classList.add('jetplay-light-theme');
      localStorage.setItem('theme', '0');
    } else if (document.body.classList.contains('jetplay-light-theme')) {
      document.body.classList.remove('jetplay-light-theme');
      document.body.classList.add('custom-theme');
      localStorage.setItem('theme', '1');
    } else {
      document.body.classList.add('jetplay-light-theme');
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.mobile = event.target.innerWidth < 768 ? true : false;
  }

  onSelectGameChange() {
    this.router.navigate(['dashboard']);
  }
}
