import { Component, OnInit, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { UserprofileService } from 'src/app/core/services/userprofile.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TestService } from 'src/app/core/services/test.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { InboxService } from 'src/app/core/services/inbox.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/internal/operators/map';
import { WalletService } from 'src/app/core/services/wallet.service';
import { ScoreService } from 'src/app/core/services/score.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { SharingDataService } from 'src/app/core/services/SharingdataService.service';


@Component({
  selector: 'app-userdetail',
  templateUrl: './UserDetail.component.html',
  styleUrls: ['./UserDetail.component.scss']
})
// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class UserDetailComponent implements OnInit {

  @ViewChild('Invpaginator') Invpaginator: MatPaginator;
  @ViewChild('Inboxpaginator') Inboxpaginator: MatPaginator;
  @ViewChild('Socialpaginator') Socialpaginator: MatPaginator;
  @ViewChild('Storagepaginator') Storagepaginator: MatPaginator;


  InventoryDataSource = new MatTableDataSource<object>();
  dataInboxSource = new MatTableDataSource<object>();
  StorageDataSource = new MatTableDataSource<object>();

  public pageEvent: any;
  public pageInboxSize = 5;
  public currentInboxPage = 0;
  public totalInboxSize = 0;

  public pageInvSize = 5;
  public currentInvPage = 0;
  public totalInventorySize = 0;

  public pageSocialSize = 5;
  public currentSocialPage = 0;
  public totalSocialSize = 0;

  public pageStorageSize = 5;
  public currentStoragePage = 0;
  public totalStorageSize = 0;

  public filterVal = '';
  private tableInit = false;
  public userList = false;
  public userForm = true;

  // Social Data tab
  SocialFriendDataSource: any = {};
  SocialFriendDisplayedColumns: any = [];

  // Storage
  // StorageDisplayedColumns: any = [];

  StorageDisplayedColumns = ['key', 'version', 'last_modified', 'action'];
  InventoryDisplayedColumns = ['item_code', 'units', 'level', 'usage_period', 'action'];
  displayedColumns = ['title', 'message_type', 'is_claimed', 'is_read', 'expiration_time', 'action'];
  messages = { 0: 'info', 1: 'reward', 2: 'gift' };

  mode: any;
  userDetails: any;
  user_id: any;
  uStorage: any;
  socialFriendList: any;
  uScore = {};
  wallet = {};
  userInboxListMessage = [];
  userInventory: any;
  public colCount = 4;
  @ViewChild('grid') g: ElementRef;

  category_list = {};
  currency_list = [];
  score_list = [];

  category_map = {
    aindentities: ['id', 'username', 'device', 'email', 'phone_no'],
    bprofile: ['country', 'online_status', 'joined_date', 'recent_login', 'is_bot', 'is_blocked', 'is_deleted'],
    zzdeleted: ['is_online', 'last_login', 'inventory']
  };

  public globalInv:any = [];
  public globalBundle:any = [];
  public unit: any;
  public profile:any = [];
  private allowed_tabs: any = ['scores', 'wallet', 'inventory', 'storage', 'inbox', 'social'];
  public tabs: any = ['profile'];
  public selected = new UntypedFormControl(0);

  constructor(
    private storeData: SharingDataService,
    private userProfile: UserprofileService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private test: TestService,
    private inbox: InboxService,
    private inventory: InventoryService,
    private confirm: ConfirmationService,
    public snackBar: MatSnackBar) {
    this.resize_item(window.innerWidth);

    this.route.data.pipe(map(data => data)).subscribe((res) => {
      this.globalInv = res.inventory.data.results;
      this.globalBundle = res.bundle.data.results;
      console.log('BUndle',this.globalBundle);
      console.log('INventory',this.globalInv);
      // this.currency_list_items = res.currency.data.results.filter(x => x.status === 'ENABLE');
      // this.score_list_items = res.scores.data.results.filter(x => x.status === 'ENABLE');
    });

  }

  ngOnInit() {
    let app_modules: any;
    localStorage.getItem('current_game') !== null ?
      app_modules = JSON.parse(this.storeData.getLocalStorage('current_game')).data.modules
      : app_modules = null;
    // app_modules = JSON.parse(localStorage.getItem('Current game'))['data']['modules'];
    if (!app_modules.includes('storage')) {
      app_modules.push('storage');
    }
    this.allowed_tabs.forEach(e => {
      if (app_modules.includes(e)) {
        this.tabs.push(e);
      }
    });
    this.mode = this.test.getMode();

    this.route.params.subscribe((params: Params) => {
      this.user_id = params['userId'];
      if (this.mode === 'view' && this.user_id) {
        this.viewUserDetails(this.user_id);
      }
    });

  }

  onTabChanged(e: any) {
    if (e.tab.textLabel === 'Inventory') {
      this.setInventoryData();
    } else if (e.tab.textLabel === 'Social') {
      this.setSocialData();
    } else if (e.tab.textLabel === 'Storage') {
      this.setUserStorageData();
    }
  }


  userFriendList() {
    this.userProfile.getSocialFriendUser(this.user_id).subscribe(res => {
      delete res.data['last_updated'];
      this.socialFriendList = res.data;
      this.setSocialData();
      if (isEmpty(this.SocialFriendDataSource) && this.tabs.includes('social')) {
        this.tabs = this.tabs.filter(item => item !== 'social');
      }
    });
  }

  setSocialData() {
    Object.keys(this.socialFriendList).forEach(k => {
      const dataSc = this.socialFriendList[k];
      if (dataSc.length > 0) {
        this.SocialFriendDataSource[k] = new MatTableDataSource<object>();
        this.totalSocialSize = dataSc.length;
        Object.keys(dataSc).forEach(ke => {
          Object.keys(dataSc[ke]).forEach(disKey => {
            if (!this.SocialFriendDisplayedColumns.includes(disKey)) {
              this.SocialFriendDisplayedColumns.push(disKey);
            }
          });
        });
        this.SocialFriendDataSource[k] = new MatTableDataSource(dataSc);
        this.SocialFriendDataSource[k].paginator = this.Socialpaginator;
      }
    });
  }

  handlePage(e: any) {
    this.currentInboxPage = e.pageIndex;
    this.pageInboxSize = e.pageSize;
    this.userInboxList();
  }

  openUserInboxDialog(inboxObject) {
    // console.log(inboxObject);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      selectedObject: inboxObject,
    };

    const dialogRef = this.dialog.open(UserInboxDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Dialog closed in single user wallet and score');
    }
    );
  }

  viewUserDetails(userId: any) {
    // console.log('user Id in func', userId);
    this.userProfile.getSingleUser(userId).subscribe(response => {
      console.log('User Details', response);

      if (response.status.code === 200) {
        this.userDetails = response.data;
        // this.score = response.data.scores;
        if (response.data.scores !== null && response.data.scores !== undefined) {
          Object.keys(response.data.scores).forEach(eleKey => {
            const eleVal = this.userDetails.scores[eleKey];
            if (typeof (eleVal) === 'number') {
              this.uScore[eleKey] = eleVal;
            } else if (typeof (eleVal) === 'object') {
              eleVal.forEach(element => {
                this.uScore[element.id] = element.units;
              });
            }
          });
        }

        // console.log('SCore', this.uScore);

        // Get Ludo User Score
        const currGame = JSON.parse(this.storeData.getLocalStorage('current_game'));
        if (currGame.data.custom_modules.length !== 0) {
          currGame.data.custom_modules.forEach(element => {
            if (element.includes('USERPROFILE_LUDO_94f58d68-beec-444e-a50a-238a93630969')) {
              this.userProfile.getSingleUserLudoScore(userId).subscribe(resp => {
                if (resp.status.code === 200) {
                  console.log('inres of score', resp);

                  this.uScore = resp.data.scores;
                } else {
                  this.uScore = {};
                }
              });
            }
          });
        }
        // End Ludo User Score

        delete this.userDetails.scores;
        Object.keys(this.userDetails.wallet).forEach(eleKey => {
          const eleVal = this.userDetails.wallet[eleKey];
          if (typeof (eleVal) === 'number') {
            this.wallet[eleKey] = eleVal;
          } else if (typeof (eleVal) === 'object') {
            eleVal.forEach(element => {
              this.wallet[element.id] = element.units;
            });
          }
        });
        // this.wallet = this.userDetails.wallet;
        delete this.userDetails.wallet;
        this.prepare_profile();
      }
    });
  }

  get_name(key: string): string {
    key = key.split('_').join(' ');
    return key;
  }

  prepare_profile() {
    // console.log('after single user response', JSON.stringify(this.userDetails));
    const os = this.userDetails.os_info;
    let os_list = '';
    delete this.userDetails.os_info;
    if (os) {
      os.forEach(element => {
        os_list = os_list ? os_list + ', ' + element.os_platform : os_list + element.os_platform;
      });
    }

    Object.keys(this.category_map).forEach(key => {
      const profile_keys = this.category_map[key];
      this.category_list[key] = [];
      profile_keys.forEach(e => {
        this.category_list[key].push({ key: this.get_name(e), value: this.userDetails[e] ? this.userDetails[e] : '-' });
        delete this.userDetails[e];
      });
    });

    const keys = Object.keys(this.userDetails);
    if (keys.length > 0) {
      this.category_list['zother'] = [];
      // console.log('keys in if keys', keys);
      keys.forEach(e => {
        if (e === 'energy') {
          if (isEmpty(this.userDetails[e])) {
            this.userDetails[e] = 0;
          } else {
            this.userDetails[e] = this.userDetails[e]['energy'];
          }
        }
        // console.log('in is else empty keys', keys);
        this.category_list['zother'].push({ key: this.get_name(e), value: this.userDetails[e] });
        delete this.userDetails[e];
      });
    }

    delete this.category_list['zzdeleted'];
    if (this.tabs.includes('inbox')) {
      this.userInboxList();
    }
    if (this.tabs.includes('inventory')) {
      this.userInventorylistFunc();
    }
    if (this.tabs.includes('social')) {
      this.userFriendList();
    }
    if (this.tabs.includes('storage')) {
      this.userStorage();
    }
  }

  userStorage() {
    this.userProfile.getUserStorage(this.user_id).subscribe(res => {
      if (res.status.code === 200) {
        console.log('User Storage', res.data);
        // res.data.push({
        //   key: 'monster',
        //   value: {
        //     monster: 'monty',
        //     Monstrlist: '[0,00,0,0,0]',
        //     data1: {
        //       data2: '{"_Id":"342","_TrophyCnt":26,"_WinStreakCnt":1,"_Rank":0,"_Lock":false}',
        //       Monstrlist1: '[9,90,9,9,9]',
        //       data3: {
        //         monster1: 'monty1',
        //         Monstrlist2: '[99,999]',
        //         data4: {
        //           data5: '{"_Id":"34","_TrophyCnt":26,"_WinStreakCnt":1,"_Rank":0,"_Lock":false}'
        //         }
        //       }
        //     }
        //   },
        //   version: '2020-03-16 00:00:00',
        //   last_modified: '2020-03-23T05:02:45.130000Z'
        // });
        this.uStorage = res.data;
        this.totalStorageSize = res.data.length;
        // Object.keys(res.data).forEach(ke => {
        //   Object.keys(res.data[ke]).forEach(disKey => {
        //     if (!this.StorageDisplayedColumns.includes(disKey)) {
        //       this.StorageDisplayedColumns.push(disKey);
        //     }
        //   });
        // });
        this.setUserStorageData();
      }
    });
  }

  setUserStorageData() {
    this.StorageDataSource = new MatTableDataSource(this.uStorage);
    this.StorageDataSource.paginator = this.Storagepaginator;
  }


  blockDelUser(event: MatSlideToggleChange, actionName) {

    if (actionName === 'is blocked') {
      const userLock = {};
      let msg;
      userLock['users'] = [this.user_id];
      if (event.checked === true) {
        userLock['operation'] = 'Lock';
        msg = 'Blocked';
      } else {
        userLock['operation'] = 'Unlock';
        msg = 'Un-Blocked';
      }
      this.userProfile.userLock(userLock).subscribe(response => {
        // console.log('resp', response);
        if (response.status.code === 200) {
          this.snackBar.open('User is ' + msg, 'Dismiss', { duration: 3000 });
        }
      });

    } else if (actionName === 'is deleted') {
      if (event.checked === true) {
        const title = 'Delete User?';
        const body = 'Are you sure you want to delete "' + this.user_id + '" user?';
        this.confirm.confirmation(title, body).subscribe(response => {
          if (response === true) {
            this.userProfile.deleteUser(this.user_id).subscribe(resp => {
              this.snackBar.open(this.user_id + ' is deleted', 'Dismiss', { duration: 3000 });
              this.router.navigate(['userprofile']);
            });
          } else {
            // console.log('in is deleted checked', event);
            event.source.checked = false;
          }

        });

      }
    }

  }

  invUserList = [];
  InactiveInvUserList = [];

  userInventorylistFunc() {
    this.inventory.userInventoryList(this.user_id).subscribe(response => {
      if (response.status.code === 200) {
        this.userInventory = response.data.owned_items;
        this.totalInventorySize = response.data.count;
        this.setInventoryData();
        if (this.userInventory !== undefined) {
          this.userInventory.forEach(element => {
            const InvUserLs = this.globalInv.filter((x: any) => x.id === element.item_id);
            if (InvUserLs.length !== 0 && !this.invUserList.includes(InvUserLs[0].item_code)) {
              this.invUserList.push(InvUserLs[0].item_code);
            }
            if (InvUserLs.length !== 0 && !this.InactiveInvUserList.includes(InvUserLs[0].item_code) &&
              InvUserLs[0].item_status === 'INACTIVE') {
              this.InactiveInvUserList.push(InvUserLs[0].item_code);
            }
          });
        }
      }
    });
  }

  setInventoryData() {
    this.InventoryDataSource = new MatTableDataSource(this.userInventory);
    this.InventoryDataSource.paginator = this.Invpaginator;
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.InactiveInvUserList = [];
    this.invUserList = [];
  }

  creditDebitUnits(obj: any, operation: any) {
    // console.log('in response inventory all', this.globalInv);
    // console.log('**** INACTIVE', this.InactiveInvUserList);
    if (this.InactiveInvUserList.includes(obj.item_code)) {
      this.snackBar.open(obj.item_code + ' inventory item is "INACTIVE"', 'Dismiss', { duration: 3000 });
      return;
    }
    this.inventory.updateUserInventory(this.user_id, obj.item_id, operation, {}).subscribe(response => {
      obj.units = response.data.updated_items[0].units;
      obj.level = response.data.updated_items[0].level;
      if (response.data.updated_items[0].usage_period) {
        obj.usage_period = response.data.updated_items[0].usage_period;
      }
    });
  }

  addUserInventoryDialog(name: any, editInvRow: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    if (name === 'inventory') {
      const invList = editInvRow === '' ? this.globalInv.filter(x => x.item_status === 'ACTIVE') :
        this.globalInv.filter(x => x.item_status === 'ACTIVE' && x.item_code === editInvRow.item_code);
      // console.log('user Inventary dialog', invList);
      dialogConfig.data = {
        globalInvList: invList,
        userId: this.user_id,
        userInv: this.userInventory
      };

      const dialogRef = this.dialog.open(UserInventoryDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('Dialog closed in inventory Dialog', result);
        // this.userInventorylistFunc();
        this.viewUserDetails(this.user_id);
      }
      );
    }

    if (name === 'bundle') {
      dialogConfig.data = {
        globalBundleList: this.globalBundle.filter(x => x.bundle_status === 'ACTIVE'),
        userId: this.user_id,
      };

      const dialogRef = this.dialog.open(UserBundleDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('Dialog closed in bundle Dialog', result);
        // this.userInventorylistFunc();
        this.viewUserDetails(this.user_id);
      }
      );
    }
  }

  userInboxList() {
    // console.log('In user Inbox List', this.user_id);
    this.inbox.userListInboxMessage(this.user_id, this.currentInboxPage + 1, this.pageInboxSize).subscribe(response => {
      this.userInboxListMessage = response.data.results;
      this.dataInboxSource = new MatTableDataSource(this.userInboxListMessage);
      // console.log('Response of perticular user messages', this.dataInboxSource);
      this.totalInboxSize = response.data.count;
      if (!this.tableInit) {
        this.dataInboxSource.paginator = this.Inboxpaginator;
        this.tableInit = true;
      }
    });
  }

  deleteUserInboxMessage(message_id: any, deleteType: any) {

    const title = deleteType + ' Message?';
    const body = 'Are you sure you want to ' + deleteType + ' "' + message_id + '" Message?';

    this.confirm.confirmation(title, body).subscribe(response => {
      if (response === true) {
        if (deleteType === 'Archive') {
          this.inbox.deleteUserListInboxMessage(this.user_id, message_id, 'soft').subscribe(resp => {
            if (resp.status.code === 200) {
              this.snackBar.open(message_id + ' Message Deleted ', 'Dismiss', { duration: 3000 });
              this.userInboxList();
            }
          });
        } else {
          this.inbox.deleteUserListInboxMessage(this.user_id, message_id, 'hard').subscribe(resp => {
            if (resp.status.code === 200) {
              this.snackBar.open(message_id + ' Message Deleted ', 'Dismiss', { duration: 3000 });
              this.userInboxList();
            }
          });
        }

      }
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize_item(event.target.innerWidth);
  }

  resize_item(width) {
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
    const width = {
      1: '100% ',
      2: '50% ',
      3: '33% ',
      4: '25% '
    };
    const mystyle = {
      'margin-top': '2%',
      'display': 'inline-grid',
      'grid-template-columns': Array(this.colCount + 1).join(width[this.colCount])
    };
    return mystyle;
  }

  openDialog(user: object, dialogTitle: string) {
    user['title'] = dialogTitle;
    user['userId'] = this.user_id;

    if (dialogTitle === 'addWallet' || dialogTitle === 'addScore') {
      user['user_currency'] = this.wallet;
      user['user_score'] = this.uScore;
    }
    // console.log('selected user score for edit', user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      selectedObject: user,
    };

    if (dialogTitle === 'wallet' || dialogTitle === 'score') {
      const dialogRef = this.dialog.open(ScoreAndWalletDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('Dialog closed in single user wallet and score');
        this.viewUserDetails(this.user_id);
      });
    } else if (dialogTitle === 'addWallet' || dialogTitle === 'addScore') {
      const dialogRef = this.dialog.open(ScoreAndWalletAddComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.viewUserDetails(this.user_id);
        // console.log('Dialog closed in single user wallet and score');
      });
    }
  }

  // s = {};

  // JSONParse(sData: any) {
  //   const store = {};
  //   // let prevEle: any;
  //   Object.keys(sData).forEach(ele => {
  //     console.log(ele);
  //     // prevEle = ele;
  //     if (typeof (sData[ele]) === 'string' && sData[ele] !== null && sData[ele] !== undefined) {
  //       console.log('in type of string', ele, '******************');
  //       try {
  //         store[ele] = JSON.parse(sData[ele]);
  //       } catch {
  //         store[ele] = sData[ele];
  //       }
  //     } else if (typeof (sData[ele]) === 'object') {
  //       console.log('in type of object', ele);
  //       this.JSONParse(sData[ele]);
  //     }
  //   });
  //   // this.s[prevEle] = store;
  //   console.log('ssssssssssss', store, this.s);
  // }

  openStorageDialog(sData, sKe) {
    // console.log('Data Value', sData);
    // this.JSONParse(sData);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      selectedObject: sData,
      sKey: sKe
    };
    const dialogRef = this.dialog.open(StorageDialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('Dialog closed in single user wallet and score');
    //   this.viewUserDetails(this.user_id);
    // });
  }

  viewUserCreateMessage() {
    this.userList = true;
    this.userForm = false;
  }

  viewUserInboxMessage() {
    this.userList = false;
    this.userForm = true;
    this.userInboxList();
  }

}


@Component({
  templateUrl: 'ScoreAndWalletDialog.html'
})
export class ScoreAndWalletDialogComponent implements OnInit {

  updateValueForm: UntypedFormGroup;

  public selectedObject: object;

  constructor(
    private dialogRef: MatDialogRef<ScoreAndWalletDialogComponent>,
    private wallet: WalletService,
    private score: ScoreService,
    // private inv: InventoryService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
    this.selectedObject = data.selectedObject;
    // console.log('In Score and wallet update Dialog', this.selectedObject);
  }

  ngOnInit() {
    this.updateValueForm = this.fb.group({
      code: new UntypedFormControl({
        value: this.selectedObject['key'] ?
          this.selectedObject['key'] : this.selectedObject['item_code'], disabled: true
      }),
      current_value: new UntypedFormControl({ value: '', disabled: true }),
      difference: 0,
      final_value: this.selectedObject['value']
    });
  }

  onSubmit(form_name: string, form: any): void {
    // console.log('you submitted value:', form_name, form, this.selectedObject['value']);
    const updatedObject = {};
    if (this.selectedObject['key']) {
      updatedObject[this.selectedObject['key']] = +form['difference'];
    }
    // if (this.selectedObject['units']) {
    //   updatedObject['units'] = form['difference'];
    // }
    if (this.selectedObject['title'] === 'score') {
      // console.log('In score service', updatedObject);
      this.score.updateUserScore(this.selectedObject['userId'], updatedObject).subscribe(response => {
        // console.log('response after dialog score success', response);
        this.selectedObject['value'] = +form['final_value'];
      });
    } else if (this.selectedObject['title'] === 'wallet') {
      // console.log('In wallet service', updatedObject);
      this.wallet.updateUserWallet(this.selectedObject['userId'], updatedObject).subscribe(response => {
        // console.log('response after dialog wallet success', response);
        this.selectedObject['value'] = +form['final_value'];
      });
    }
    // else if (this.selectedObject['title'] === 'inventory') {
    //   console.log('In Inventory service', updatedObject);
    //   this.inv.updateUserInventory(this.selectedObject['userId'], this.selectedObject['item_id'], updatedObject).subscribe(response => {
    //     console.log('response after dialog Inventory success', response);
    //     this.selectedObject['units'] = form['final_value'];
    //   });
    // }
    this.close();
  }

  changeFinalValue() {
    const diff = this.updateValueForm.get('difference').value;
    let final_val: number;

    // if (diff === null) {
    //   this.updateValueForm.get('final_value').setValue(0);
    // }

    if (diff !== NaN && diff !== null) {


      if (this.selectedObject['value'] !== 0) {
        final_val = +(this.selectedObject['value']) + diff;
      } else {
        final_val = 0 + diff;
      }
      // else if (this.selectedObject['units']) {
      //   final_val = this.selectedObject['units'] + diff;
      // }
      // console.log('change final Value', this.selectedObject['value'], diff, final_val);
      this.updateValueForm.get('final_value').setValue(final_val);
      // console.log('In change final value', this.updateValueForm.get('difference').value);
    }
  }

  changeDifference() {
    const final_val = this.updateValueForm.get('final_value').value;
    // const diff = final_val - this.selectedObject['value'];
    let diff: number;

    if (final_val === null) {
      this.updateValueForm.get('final_value').setValue(0);
      this.updateValueForm.get('difference').setValue(-this.selectedObject['value']);
    }

    if (final_val !== NaN && final_val !== null) {

      if (this.selectedObject['value'] !== 0) {
        diff = final_val - this.selectedObject['value'];
      } else {
        diff = final_val - 0;
      }
      // else if (this.selectedObject['units']) {
      //   diff = final_val - this.selectedObject['units'];
      // }
      this.updateValueForm.get('difference').setValue(diff);
      // console.log('In change difference');
    }
  }

  close() {
    this.dialogRef.close();
  }
}


@Component({
  templateUrl: 'UserInboxDialog.html'
})
export class UserInboxDialogComponent {

  public userInboxObject: object;
  public inboxDetail = false;
  public inboxAttrib = true;
  messages = { 0: 'info', 1: 'reward', 2: 'gift' };

  constructor(
    private dialogRef: MatDialogRef<ScoreAndWalletDialogComponent>,
    private rew: RewardService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.userInboxObject = data.selectedObject;
    this.mapRewardId();
    // console.log('In Dialog', typeof (this.userInboxObject['content'].reference_id));
  }

  mapRewardId() {
    if (this.userInboxObject['content'].reference_id !== '' && this.userInboxObject['content'].message_type === 1) {
      // console.log(this.userInboxObject['content'].reference_id);
      this.rew.getSingleReward(this.userInboxObject['reference_id']).subscribe(response => {
        if (response.status.code === 200) {
          this.userInboxObject['content'].reference_id = response.data['name'];
        }
      });
    } else if (this.userInboxObject['content'].reference_id) {
      // const sp = this.userInboxObject['content'].reference_id.split(' ');
      // if (sp.length === 1) {
      //   this.userInboxObject['content'].reference_id = this.userInboxObject['content'].reference_id + ' (Gift)';
      // } else {
      this.userInboxObject['content'].reference_id = this.userInboxObject['content'].reference_id;
      // }
    }
  }

  showAttrib() {
    this.inboxDetail = true;
    this.inboxAttrib = false;
  }

  showDetail() {
    this.inboxDetail = false;
    this.inboxAttrib = true;
  }


  // onSubmit(form_name: string, form: any): void {
  //   console.log('you submitted value:', form_name, form);
  //   this.close();
  // }

  close() {
    this.dialogRef.close();
  }
}


@Component({
  templateUrl: 'UserInventoryDialog.html'
})
export class UserInventoryDialogComponent implements OnInit {

  public globalInvList: any;
  userId: any;
  userInvForm: UntypedFormGroup;
  // units: any;
  userInv: any;
  item_list: any = [];

  editUserInv = false;

  constructor(
    private dialogRef: MatDialogRef<UserInventoryDialogComponent>,
    private inv: InventoryService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
    this.globalInvList = data.globalInvList;
    this.userId = data.userId;
    this.userInv = data.userInv;
    this.item_list = this.globalInvList.map(x => x.item_code);

    // console.log('in inventory dialog', this.globalInvList, this.userId, this.userInv);
  }

  ngOnInit() {
    this.userInvForm = this.fb.group({
      inventory_id: '',
      current_units: new UntypedFormControl({ value: 0, disabled: true }),
      difference: 0,
      final_units: 0
    });
    if (this.item_list.length === 1) {
      this.editUserInv = true;
      this.userInvForm.get('inventory_id').setValue(this.item_list[0]);
      this.userInvForm.get('current_units').setValue(0);
      if (this.userInv !== undefined) {
        this.userInv.forEach(element => {
          if (this.item_list[0] === element.item_code) {
            this.userInvForm.get('current_units').setValue(element.units);
          }
        });
      }
    }
  }



  filterList(val) {
    // this.checkCode = false;
    this.item_list = this._filter(val);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    this.item_list = this.globalInvList.filter(option => option.item_code.toLowerCase().includes(filterValue));
    this.item_list = this.item_list.map(x => x.item_code);
    return this.item_list;
  }



  onSubmit(form_name: string, form: any): void {

    const invIdUnit = {};
    invIdUnit['units'] = form.difference;
    const invId = this.globalInvList.filter(x => x.item_code === form.inventory_id);
    if (invId.length !== 0) {
      form.inventory_id = invId[0].id;
    }

    this.inv.updateUserInventory(this.userId, form.inventory_id, 'credit', invIdUnit).subscribe(response => {
      if (response.status.code === 200) {
        // console.log('userInventory', response);
        // this.units = response.data.updated_items[0].units;
        // this.dialogRef.close(this.units);
        this.close();
      }
    });
  }

  inventoryDetails(item_code, event) {

    this.userInvForm.get('current_units').setValue(0);
    if (event.isUserInput && this.userInv !== undefined) {
      this.userInv.forEach(element => {
        if (item_code === element.item_code) {
          this.userInvForm.get('current_units').setValue(element.units);
        }
      });
    }
  }


  changeFinalValue() {
    const diff = this.userInvForm.get('difference').value;
    const curr = this.userInvForm.get('current_units').value;
    let final_val: any;
    final_val = curr + diff;
    this.userInvForm.get('final_units').setValue(final_val);
  }

  changeDifference() {
    const final_val = this.userInvForm.get('final_units').value;
    const curr = this.userInvForm.get('current_units').value;
    let diff: any;
    diff = final_val - curr;
    this.userInvForm.get('difference').setValue(diff);
  }

  close() {
    this.dialogRef.close();
  }
}


@Component({
  template: `<h2 mat-dialog-title class="text-center text-info">Add Bundle</h2>
              <mat-dialog-content>
              <mat-form-field>
                <mat-select placeholder="Select Bundle Category">
                  <mat-option (onSelectionChange)="bundleDetails(bundle_list.id,$event)"
                  *ngFor="let bundle_list of globalBundleList"
                    [value]="bundle_list.id">{{bundle_list.bundle_code
                    | titlecase}}</mat-option>
                </mat-select>
              </mat-form-field>
              <!--<a [hidden]="visibility" href="{{API_URL}}/inventory/view-bundle/{{bundle_id}}" target = "_blank">
                <mat-icon>visibility</mat-icon>
              </a>-->
              </mat-dialog-content>
              <button mat-raised-button style="float: right" (click)="onCredit()" color="accent" type="submit">Credit</button>
              <button mat-raised-button color="warn" style="float: left" (click)="close()" type="button">Close</button>`
})
export class UserBundleDialogComponent {

  public globalBundleList: any;
  userId: any;
  bundle_id: any;
  // window: any;
  // API_URL: any;
  // visibility = true;

  constructor(
    private dialogRef: MatDialogRef<UserBundleDialogComponent>,
    private inv: InventoryService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.globalBundleList = data.globalBundleList;
    this.userId = data.userId;
    // this.API_URL = window.location.origin;
    // console.log('host name', this.API_URL);

  }

  bundleDetails(bundle_id: any, $event) {
    if ($event.isUserInput) {
      // this.visibility = false;
      this.bundle_id = bundle_id;
    }
  }

  onCredit(): void {
    this.inv.creditUserBundle(this.userId, this.bundle_id).subscribe(response => {
      if (response.status.code === 200) {
        // console.log('userBundle', response);
        this.close();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}


@Component({
  template: `<h2 mat-dialog-title class="text-center text-info">Add {{title}}</h2>
              <mat-dialog-content>
                <div [formGroup]="updateValueForm">
                  <mat-form-field class="col-md-12">
                    <input type="text" formControlName="code" placeholder="Select Element" matInput
                      style="text-transform: uppercase" (keyup)="filterList($event.target.value)"
                      (blur)="checkValue()" [matAutocomplete]="auto">
                    <mat-autocomplete #auto="matAutocomplete">
                      <mat-option *ngFor="let item of item_list"
                      [disabled]="user_list.includes(item)" [value]="item">
                        {{item}}</mat-option>
                    </mat-autocomplete>
                  </mat-form-field>
                  <br/>
                  <mat-form-field class="col-md-12">
                    <input matInput type="number" formControlName="current_value" placeholder="Enter Units">
                  </mat-form-field>
                </div>
              </mat-dialog-content>
              <button mat-raised-button [disabled]="checkCode" (click)="onSubmit(updateValueForm.value)"
              style="float: right" color="accent" type="submit">Add</button>
              <button mat-raised-button color="warn" style="float: left" (click)="close()" type="button">Close</button>`

})
export class ScoreAndWalletAddComponent implements OnInit {

  updateValueForm: UntypedFormGroup;
  checkCode = false;

  public selectedObject: object;
  score_list: any = [];
  currency_list: any = [];
  item_list: any = [];

  user_score_list: any = {};
  user_currency_list: any = {};
  user_list: any = [];

  title: any;
  constructor(
    private dialogRef: MatDialogRef<ScoreAndWalletAddComponent>,
    private walletservice: WalletService,
    private scoreservice: ScoreService,
    // private inv: InventoryService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    this.selectedObject = data.selectedObject;
    // console.log('selceted Obj in add score', this.selectedObject);

    if (this.selectedObject['title'] === 'addScore') {
      this.title = 'Score';
      this.fetch_score(1);
      this.user_score_list = this.selectedObject['user_score'];
      if (!isEmpty(this.user_score_list)) {
        Object.keys(this.user_score_list).forEach(k => {
          this.user_list.push(k);
        });
      }
    } else {
      this.title = 'Wallet';
      this.fetch_currency(1);
      this.user_currency_list = this.selectedObject['user_currency'];
      if (!isEmpty(this.user_currency_list)) {
        Object.keys(this.user_currency_list).forEach(ke => {
          this.user_list.push(ke);
        });
      }
    }

  }

  checkValue() {
    if (typeof (this.updateValueForm.get('code').value) !== 'object') {
      const usercodeExist = this.user_list.includes(this.updateValueForm.get('code').value.toUpperCase());
      const itemcodeExist = this.item_list.includes(this.updateValueForm.get('code').value.toUpperCase());
      if (usercodeExist || !itemcodeExist) {
        this.checkCode = true;
        if (usercodeExist) {
          this.snackBar.open('Code is already existed', 'Dismiss', { duration: 3000 });
        }
        // else {
        //   this.snackBar.open('Element not present in list', 'Dismiss', { duration: 3000 });
        // }
      } else {
        this.checkCode = false;
      }
    }
  }

  RemoveAddedScoreItems() {
    if (!isEmpty(this.user_score_list)) {
      Object.keys(this.user_score_list).forEach(k => {
        if (this.item_list.includes(k)) {
          this.item_list.splice(this.item_list.indexOf(k), 1);
        }
      });
    }
  }

  fetch_score(page) {
    this.scoreservice.getRegisteredScores(page, 100).subscribe(response => {
      this.score_list = this.score_list.concat(response.data.results);
      if (response.data.next) {
        this.fetch_score(page + 1);
      }
      this.item_list = this.score_list.map(x => x.score_code);
      this.RemoveAddedScoreItems();

    });
  }

  RemoveAddedCurrencyItems() {
    if (!isEmpty(this.user_currency_list)) {
      Object.keys(this.user_currency_list).forEach(k => {
        if (this.item_list.includes(k)) {
          this.item_list.splice(this.item_list.indexOf(k), 1);
        }
      });
    }
  }

  fetch_currency(page) {
    this.walletservice.getRegisteredCurrencies(page, 100).subscribe(response => {
      this.currency_list = this.currency_list.concat(response.data.results);
      if (response.data.next) {
        this.fetch_currency(page + 1);
      }
      this.item_list = this.currency_list.map(x => x.currency_code);
      this.RemoveAddedCurrencyItems();
    });
  }

  filterList(val) {
    this.checkCode = false;
    this.item_list = this._filter(val);
  }

  private _filter(value: string) {
    if (value.length >= 1) {
      const filterValue = value.toLowerCase();
      if (this.selectedObject['title'] === 'addWallet') {
        this.item_list = this.currency_list.filter(option => option.currency_code.toLowerCase().includes(filterValue));
        this.item_list = this.item_list.map(x => x.currency_code);
        this.RemoveAddedCurrencyItems();
      } else if (this.selectedObject['title'] === 'addScore') {
        this.item_list = this.score_list.filter(option => option.score_code.toLowerCase().includes(filterValue));
        this.item_list = this.item_list.map(x => x.score_code);
        this.RemoveAddedScoreItems();
      }

    } else {
      if (this.selectedObject['title'] === 'addWallet') {
        this.item_list = this.currency_list.map(x => x.currency_code);
        this.RemoveAddedCurrencyItems();
      } else if (this.selectedObject['title'] === 'addScore') {
        this.item_list = this.score_list.map(x => x.score_code);
        this.RemoveAddedScoreItems();
      }
    }
    if (this.item_list.length !== 0) {
      return this.item_list;
    } else {
      this.snackBar.open('Element not present in list', 'Dismiss', { duration: 3000 });
    }
  }

  ngOnInit() {
    this.updateValueForm = this.fb.group({
      code: new UntypedFormControl(''),
      current_value: new UntypedFormControl(0),
    });
  }

  onSubmit(form: any): void {
    if (form.invalid || this.user_list.includes(form['code'])) {
      return;
    }
    form['code'] = form['code'].toUpperCase();
    const updatedObject = {};
    updatedObject[form.code] = form.current_value;

    if (this.selectedObject['title'] === 'addScore') {
      this.scoreservice.updateUserScore(this.selectedObject['userId'], updatedObject).subscribe(response => {
        this.snackBar.open('User Score Added Successfully', 'Dismiss', { duration: 3000 });
      });
    } else if (this.selectedObject['title'] === 'addWallet') {
      this.walletservice.updateUserWallet(this.selectedObject['userId'], updatedObject).subscribe(response => {
        this.snackBar.open('User Wallet Added Successfully', 'Dismiss', { duration: 3000 });
      });
    }

    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}


@Component({
  template: `
  <mat-dialog-content>
    <mat-label>Key : <b>{{storageKey}}</b></mat-label><br/>
    <mat-label>Value : </mat-label>
    <span style="word-wrap: break-word;">{{selectedObject}}</span>
    <!-- <mat-label *ngIf="selectedObject">Value : <pre>{{selectedObject|json}}</pre></mat-label> -->
      <!-- <div *ngIf="selectedObject">
        <span *ngFor="let item of selectedObject|keyvalue">
          <span style="word-wrap: break-word;">{{item.key}}</span> :
         <span style="word-wrap: break-word;">{{item.value}}</span>
        </span>
      </div> -->
  </mat-dialog-content>
  <button mat-raised-button matTooltip="Cancel" matTooltipPosition="above" (click)="close()"
    class="text-right" type="button" color="warn">Cancel</button> `
})
export class StorageDialogComponent implements OnInit {
  public selectedObject: any;
  storageKey: any;
  constructor(
    private dialogRef: MatDialogRef<StorageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) sdata) {
    this.selectedObject = JSON.stringify(sdata.selectedObject);
    this.storageKey = sdata.sKey;
  }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }
}

function isEmpty(obj) {
  // tslint:disable-next-line:forin
  for (const key in obj) {
    if (key === '' || typeof key === 'undefined' || key == null) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
