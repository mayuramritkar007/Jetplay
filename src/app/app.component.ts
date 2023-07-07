import { Component, OnInit, VERSION} from '@angular/core';
import { Router, NavigationEnd, NavigationError, ActivatedRouteSnapshot } from '@angular/router';
import { TestService } from 'src/core/services/test.service';
// import { OverlayContainer } from '@angular/cdk/overlay';
// import { ThemeStorage, DocsSiteTheme } from 'src/core/services/ThemeStorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jetplay';
  // version = VERSION;
  // theme: any;
  // themeChangerButton: string = '';
  // constructor(
  //   private overlay: OverlayContainer,
  //   private themeStorage: ThemeStorage
  // ) { }

  // themes: any[] = [
  //   { name: 'light-theme' },
  //   { name: 'dark-theme' }
  // ];

  // ngOnInit() {
  //   this.installTheme(this.themeStorage.getStoredThemeName() as string);
  // }

  // installTheme(themeName: string) {
  //   this.theme = this.themes.find(theme => theme.name === themeName);

  //   if (!this.theme) {
  //     return;
  //   }

  //   if (this.theme.name === 'dark-theme') {
  //     this.overlay.getContainerElement().classList.remove('light-theme' || '');
  //     document.body.classList.remove('light-theme');
  //     this.overlay.getContainerElement().classList.add('dark-theme');
  //     document.body.classList.add('dark-theme');
  //     this.themeChangerButton = 'Light';
  //   } else {
  //     this.overlay.getContainerElement().classList.remove('dark-theme' || '');
  //     document.body.classList.remove('dark-theme');
  //     this.overlay.getContainerElement().classList.add('light-theme');
  //     document.body.classList.add('light-theme');
  //     this.themeChangerButton = 'Dark';
  //   }

  //   if (this.theme) {
  //     this.themeStorage.storeTheme(this.theme);
  //   }
  // }

  // toggleTheme() {
  //   console.log('Change theme')
  //   this.themeStorage.clearStorage();
  //   if (this.overlay.getContainerElement().classList.contains('dark-theme')) {
  //     this.overlay.getContainerElement().classList.remove('dark-theme');
  //     this.overlay.getContainerElement().classList.add('light-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
  //     this.themeChangerButton = 'Dark';
  //   } else if (this.overlay.getContainerElement().classList.contains('light-theme')) {
  //     this.overlay.getContainerElement().classList.remove('light-theme');
  //     this.overlay.getContainerElement().classList.add('dark-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'dark-theme'));
  //     this.themeChangerButton = 'Light';
  //   } else {
  //     this.overlay.getContainerElement().classList.add('light-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
  //     this.themeChangerButton = 'Dark';
  //   }
  //   if (document.body.classList.contains('dark-theme')) {
  //     document.body.classList.remove('dark-theme');
  //     document.body.classList.add('light-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
  //     this.themeChangerButton = 'Dark';
  //   } else if (document.body.classList.contains('light-theme')) {
  //     document.body.classList.remove('light-theme');
  //     document.body.classList.add('dark-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'dark-theme'));
  //     this.themeChangerButton = 'Light';
  //   } else {
  //     document.body.classList.add('light-theme');
  //     this.themeStorage.storeTheme(this.themes.find(theme => theme.name === 'light-theme'));
  //     this.themeChangerButton = 'Dark';
  //   }
  // }

  constructor(
    private router: Router,
    private test: TestService) {
  }


  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', function (e) {
      // console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.test.setTitle(this.getDeepestTitle(this.router.routerState.snapshot.root, 'title'));
        this.test.setMode(this.getDeepestTitle(this.router.routerState.snapshot.root, 'mode'));
        this.test.setEventType(this.getDeepestTitle(this.router.routerState.snapshot.root, 'event_type'));
      } else if (event instanceof NavigationError) {
        if (localStorage.getItem('GameId')) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot, key: any) {
    let title = routeSnapshot.data ? routeSnapshot.data[key] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild, key) || title;
    }
    return title;
  }

}
