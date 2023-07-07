import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { Router } from '@angular/router';
import { SharingDataService } from 'src/core/services/SharingdataService.service';
import { UserprofileService } from 'src/core/services/userprofile.service';

interface Search {
  value: string;
  viewValue: string;
}

interface SearchGroup {
  disabled?: boolean;
  name: string;
  search: Search[];
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: any // For pagination
  @ViewChild(MatSort, {static: false}) sort: any; // For Sort

  // dataSource: UserprofileDataSource;

  userDataSource:any = new MatTableDataSource<object>();
  userWalletDataSource:any = new MatTableDataSource<object>();

  public pageSize = 10;
  // tslint:disable-next-line:member-ordering
  public currentPage = 0;
  public totalSize = 0;
  private tableInit = false;
  public spinnerActive = false;
  public scores = {};
  public pageEvent: any;

  searchControl = new FormControl('');
  searchGroups: SearchGroup[] = [
    {
      name: 'User Status',
      search: [
        {value: 'online', viewValue: 'User Online'},
        {value: 'offline', viewValue: 'User Offline'},
      ],
    },
    {
      name: 'Account Status',
      search: [
        {value: 'locked', viewValue: 'User Account Locked'},
        {value: 'unlocked', viewValue: 'User Account Unlocked'},
      ],
    },
    {
      name: 'Platform',
      // disabled: true,
      search: [
        {value: 'android', viewValue: 'User Device (Android)'},
        {value: 'ios', viewValue: 'User Device (IOS)'},
      ],
    },
  ];

  Searching = '';
  filterId = '';
  filterUserame = '';
  filterEmail = '';
  filterCountry = '';
  searchStr = '';

  online: boolean = false;
  offline: boolean = false;
  locked: boolean = false;
  unlocked: boolean = false;

  hideUserTable = false;
  BockButtons = true;
  userView = false;
  pageFilter = false;

  searchList:any = [];
  userData:any = [];
  blocked_list:any = [];
  mode: any = 'list';
  SSCC:boolean = false;

  beforeSearch:boolean = true;
  afterSearch:boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'id', 'username', 'email', 'country', 'is_online', 'is_blocked'];

  constructor(
    private userProfile: UserprofileService,
    private snackBar: MatSnackBar,
    private shareData: SharingDataService,
    private router: Router
  ) {

    const currGame = JSON.parse(this.shareData.getLocalStorage('current_game'));
    if (currGame.data.custom_modules.length !== 0) {
      currGame.data.custom_modules.forEach((element: string | string[]) => {
        if (element.includes('UserProfile_989c1117-646b-4bc9-858f-ba68e48d49ef')) {
          this.SSCC = true;
        }
      });
    }

    if (this.shareData.getData() !== undefined && this.shareData.getData() !== null) {
      this.Searching = this.shareData.getData();
      this.searchStr = 'search=' + this.Searching;
      if (this.SSCC && (this.Searching !== undefined && this.Searching !== '')) {
        this.resetUserList();
      }
    }
  }

  ngOnInit() {
    if (this.SSCC === false) {
      this.resetUserList();
    }
  }

  searchUser() {
    this.BockButtons = true;
    console.log('event searching', this.Searching.trim());
    if (this.SSCC && (this.Searching === undefined || this.Searching === '')) {
      this.afterSearch = false;
      this.beforeSearch = true;
      this.userDataSource = new MatTableDataSource([]);
      this.totalSize = 0;
      return;
    }
    if (this.Searching !== undefined) {
      this.searchStr = 'search=' + this.Searching.trim();
      this.shareData.setData(this.Searching.trim(), 'user');
      this.hideUserTable = false;
      this.resetUserList();
    }
    this.spinnerActive = true;
  }



  OnChange($event: any) {
    console.log('In Change');
    
    // if ($event.checked) {
    //   this.searchList.push($event.source.value);
    // } else {
    //   this.searchList.splice(this.searchList.indexOf($event.source.value), 1);
    // }
    this.searchList = $event.source.value;
    // console.log('search list', this.searchList);
    // console.log('search list new', this.searchControl, $event.source.value);

    this.searchList.forEach((element:any) => {
      console.log('lement', element);
      if (element === 'online') {
        this.online = true;
      }
      if (element === 'offline') {
        this.online = false;
      }
      if (element === 'locked') {
        this.locked = true;
      }
      if (element === 'unlocked') {
        this.locked = false;
      }
    });
    this.filterUser();
  }


  filterUser() {
    this.blocked_list = [];
    this.searchStr = '';
    this.BockButtons = true;
    this.searchStr = this.searchStr.concat('search');
    if (this.Searching !== '') {
      this.searchStr = this.searchStr.concat('=' + this.Searching.trim());
    }
    if (this.filterEmail !== '') {
      this.searchStr = this.searchStr.concat('&email=' + this.filterEmail.trim());
    }
    if (this.filterUserame !== '') {
      this.searchStr = this.searchStr.concat('&username=' + this.filterUserame.trim());
    }
    if (this.filterCountry !== '') {
      this.searchStr = this.searchStr.concat('&country=' + this.filterCountry);
    }

    if (this.searchList.includes('android')) {
      this.searchStr = this.searchStr.replace('&platform=ios', '');
      this.searchStr = this.searchStr.concat('&platform=android');
    }
    if (this.searchList.includes('ios')) {
      this.searchStr = this.searchStr.replace('&platform=android', '');
      this.searchStr = this.searchStr.concat('&platform=ios');
    }


    if (this.searchList.length !== 0) {
      if (this.online === true || this.online === false) {
        this.searchStr = this.searchStr.concat('&online=' + this.online);
      }
      if (this.locked === true || this.locked === false) {
        this.searchStr = this.searchStr.concat('&locked=' + this.locked);
      }
    }


    if (this.searchList.includes('online') && this.searchList.includes('offline')) {
      this.searchStr = this.searchStr.replace('&online=false', '&online');
      this.searchStr = this.searchStr.replace('&online=true', '&online');
      // console.log('in if search str', this.searchStr);
    }

    if (!this.searchList.includes('online') && !this.searchList.includes('offline')) {
      this.searchStr = this.searchStr.replace('&online=false', '&online');
      this.searchStr = this.searchStr.replace('&online=true', '&online');
      // console.log('in if search str', this.searchStr);
    }

    if (this.searchList.includes('locked') && this.searchList.includes('unlocked')) {
      this.searchStr = this.searchStr.replace('&locked=false', '&locked');
      this.searchStr = this.searchStr.replace('&locked=true', '&locked');
      // console.log('in if search str', this.searchStr);
    }

    if (!this.searchList.includes('locked') && !this.searchList.includes('unlocked')) {
      this.searchStr = this.searchStr.replace('&locked=false', '&locked');
      this.searchStr = this.searchStr.replace('&locked=true', '&locked');
      // console.log('in if search str', this.searchStr);
    }

    if (this.searchList.includes('android') && this.searchList.includes('ios')) {
      this.searchStr = this.searchStr.replace('&platform=android', '&platform');
      this.searchStr = this.searchStr.replace('&platform=ios', '&platform');
      // console.log('in if search str', this.searchStr);
    }

    if (!this.searchList.includes('android') && !this.searchList.includes('ios')) {
      this.searchStr = this.searchStr.replace('&platform=android', '&platform');
      this.searchStr = this.searchStr.replace('&platform=ios', '&platform');
      // console.log('in if search str', this.searchStr);
    }

    console.log('Filter User', this.searchStr);
    if (this.SSCC && (!this.searchStr.includes('platform')
      && !this.searchStr.includes('locked') && !this.searchStr.includes('online')
      && (this.Searching === undefined || this.Searching === '')
    )) {
      this.afterSearch = false;
      this.beforeSearch = true;
      this.userDataSource = new MatTableDataSource([]);
      this.totalSize = 0;
      return;
    }
    console.log('After Filter User', this.searchStr);
    this.hideUserTable = false;
    this.pageFilter = true;
    this.resetUserList();
    this.spinnerActive = true;
  }


  OnUserlistChange($event: any) {
    this.BockButtons = false;

    if ($event.checked === true) {
      this.blocked_list.push($event.source.value);
    } else if ($event.checked === false) {
      this.blocked_list.splice(this.blocked_list.indexOf($event.source.value), 1);
    }
    if (this.blocked_list.length === 0) {
      this.BockButtons = true;
    }
    // console.log('Blocked list', this.blocked_list);
  }

  blockedList() {
    const userLock:any = {};
    userLock['users'] = this.blocked_list;
    userLock['operation'] = 'Lock';
    // console.log('Before response of blocked users', userLock);
    this.userProfile.userLock(userLock).subscribe(response => {
      // console.log('after response of blocked users', response);
      if (response.status.code === 200) {
        this.snackBar.open(this.blocked_list.length + ' Users Are Blocked Successfully.', 'Dismiss', { duration: 3000 });
        this.resetUserList();
        this.BockButtons = true;
        this.blocked_list = [];
      }
    });
  }

  UnblockedList() {
    const userLock:any = {};
    userLock['users'] = this.blocked_list;
    userLock['operation'] = 'Unlock';
    // console.log('Before response of blocked users', userLock);
    this.userProfile.userLock(userLock).subscribe(response => {
      // console.log('after response of unblocked users', response);
      if (response.status.code === 200) {
        this.snackBar.open(this.blocked_list.length + ' Users Are Un-Blocked Successfully.', 'Dismiss', { duration: 3000 });
        this.resetUserList();
        this.BockButtons = true;
        this.blocked_list = [];
      }

    });
  }


  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.resetUserList();
  }

  resetUserList() {
    if (this.pageFilter === true) {
      this.currentPage = 0;
    }

    // setTimeout(() => {
      this.userProfile.getUserList(this.searchStr, this.currentPage + 1, this.pageSize).subscribe((response) => {
        if (response.status.code === 200) {
          this.pageFilter = false;
          this.userData = response.data.results;
          if (this.SSCC) {
            if (response.data.count === 1 && this.SSCC) {
              const UserId = response.data.results[0].id;
              this.router.navigateByUrl('/userprofile/viewuser/' + UserId);
            } else if (response.data.count === 0 && this.SSCC) {
              this.afterSearch = true;
              this.beforeSearch = false;
              this.spinnerActive = false;
            } else if (response.data.count > 1 && this.SSCC) {
              this.userDataSource = new MatTableDataSource(this.userData);
              this.totalSize = response.data.count;
              this.spinnerActive = false;
              if (!this.tableInit) {
                this.userDataSource.paginator = this.paginator;
                this.tableInit = true;
              }
            }
          } else {
            this.userDataSource = new MatTableDataSource(this.userData);
            // const id_list: any = this.userData.map((x: any) => x.id);
            // console.log('idlist', id_list);
            this.totalSize = response.data.count;
            this.spinnerActive = false;
            if (!this.tableInit) {
              this.userDataSource.paginator = this.paginator;
              this.tableInit = true;
            }
            // console.log('After Search User response', response);
          }
        }
      });  
    // }, 10000);
    
  }

  // addTab(selectAfterAdding: boolean) {
  //   this.tabs.push('New');

  //   if (selectAfterAdding) {
  //     this.selected.setValue(this.tabs.length - 1);
  //   }
  // }

  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }
}
