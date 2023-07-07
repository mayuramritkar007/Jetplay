import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/core/services/confirmation.service';
import { GamedetailsService } from 'src/core/services/gamedetails.service';
import { ManageAccountService } from 'src/core/services/manageaccount.service';
import { SharingDataService } from 'src/core/services/SharingdataService.service';
import { TestService } from 'src/core/services/test.service';
import { ManageAccountComponent } from '../manageAccount/manageAccount.component';


@Component({
  selector: 'app-list-user-account',
  templateUrl: './list-user-account.component.html',
  styleUrls: ['./list-user-account.component.css']
})
export class ListUserAccountComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: false}) paginator: any // For pagination
  @ViewChild(MatSort, {static: false}) sort: any; // For Sort

  dataSource:any = new MatTableDataSource<object>();

  displayedColumns:any = ['first_name', 'mobile_number', 'status', 'actions'];

  public pageSize:number = 10;
  public currentPage:number = 0;
  public totalSize:number = 0;
  public filterValue:string = '';
  public tableSort:string = '';
  member_list:any = [];
  dialogConfig: any;
  public pageEvent: any;

  private tableInit:boolean = false;

  constructor(
    private confirm: ConfirmationService,
    private dialog: MatDialog,
    private manageaccount: ManageAccountService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit() {
    this.resetMemberList();
    this.dataSource.paginator = this.paginator;
  }

  // getMemberList() {
  //   this.manageaccount.getMemberList(this.currentPage + 1, this.pageSize, this.filterValue, this.tableSort).subscribe(response => {
  //     this.member_list = response.data.results;
  //     this.dataSource = new MatTableDataSource(this.member_list);
  //     this.totalSize = response.data.count;
  //   });
  // }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    console.log("Page Size",e.pageSize,e.pageIndex);
    
    this.resetMemberList();
  }

  resetMemberList() {
    this.manageaccount.getMemberList(this.currentPage + 1, this.pageSize, this.filterValue, this.tableSort).subscribe((response) => {
      this.member_list = response.data.results;
      this.dataSource = new MatTableDataSource(this.member_list);
      this.totalSize = response.data.count;
      if (!this.tableInit) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.tableInit = true;
      }
    });
  }

  // resetMemberList() {
  //   this.manageaccount.getMemberList(this.currentPage + 1, this.pageSize, this.filterValue, this.tableSort).subscribe(response => {
  //     this.member_list = response.data.results;
  //     this.totalSize = response['data']['count'];
  //     this.dataSource = new MatTableDataSource(this.member_list);
  //   });
  // }


  applyFilter(filterValue: any) {
    this.filterValue = filterValue.target.value.trim().toLowerCase(); // Remove whitespace
    if (filterValue !== '') {
      const li = this.member_list.filter((x:any) => x.first_name.includes(this.filterValue));
      if (li.length !== 0) {
        this.dataSource = new MatTableDataSource(li);
        this.totalSize = li.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } else {
      this.dataSource = new MatTableDataSource(this.member_list);
      this.totalSize = this.member_list.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  // sortData(event) {
  //   // this.currentPage = 0;
  //   this.tableSort = event.direction !== '' ? (event.direction === 'desc' ? '-' : '') + event.active : '';
  //   // this.resetMemberList();
  // }


  // tslint:disable-next-line:use-lifecycle-interface
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  changeStatus(row:any, $event:any) {
    let status = 'INACTIVE';
    if ($event.checked === true) {
      status = 'ACTIVE';
    }
    const userStatus:any = {};
    userStatus['status'] = status;
    userStatus['user_id'] = row.id;

    const title = status + ' USER ?';
    const body = 'Do you want to ' + status + ' status of "' +
      row.first_name + ' ' + row.last_name + '" ?';

    this.confirm.confirmation(title, body).subscribe(response => {
      if (response === true) {
        this.manageaccount.updateUserStatus(userStatus).subscribe(res => {
          if (res.status.code === 200) {
            this.snackBar.open(row.first_name + ' ' +
              row.last_name + ' status has been changed', 'Dismiss', { duration: 3000 });
            $event.source.checked = status === 'ACTIVE' ? true : false;
          }
        });
      } else {
        $event.source.checked = !$event.checked;
      }
    });

    // this.manageaccount.updateUserStatus(user_status).subscribe(res => {
    //   this.snackBar.open(row.first_name + ' ' + row.last_name + ' status has been changed', 'Dismiss', { duration: 3000 });
    // });
  }

  openNewMemberDialog() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(ManageAccountComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.resetMemberList();
    });
  }

  openUserAppDialog(row:any) {
    // console.log('Row Data', row);

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.data = {
      // selectedObject: selectedObject,
      userAppList: row.user_apps,
      user_id: row.id
      // bundle: this.bundle_list,
    };
    const dialogRef = this.dialog.open(ViewManageAccountComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.resetMemberList();
    });
  }
}




@Component({
  templateUrl: 'viewUserApps.html',
  // tslint:disable-next-line:max-line-length
  styles: ['.mat-column-actions { display: flex !important; justify-content: center !important;} .mat-column-module_per{ display: flex !important; justify-content: center !important;}']
})
export class ViewManageAccountComponent implements OnInit {

  showEdit = true;
  selectedObject: any;
  dataSourceGameApp = new MatTableDataSource<object>();
  displayedColumns = ['name', 'description', 'actions', 'module_per'];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  apps_list: any;
  AdminGameList = JSON.parse(this.storeData.getLocalStorage('user_apps_list'));
  GameNameList: any = [];
  user_id: any;
  gameId: any = '';
  dialogConfig: any;

  constructor(
    public storeData: SharingDataService,
    public gamePermission: ManageAccountService,
    private snackBar: MatSnackBar,
    public rest: GamedetailsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewManageAccountComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
    this.apps_list = data.userAppList;
    this.user_id = data.user_id;
    this.resetGameAppList();
    // this.dataSourceGameApp = new MatTableDataSource(this.apps_list);
    // this.GameNameList = this.AdminGameList.map(x => x.name);
    console.log('in View Mgmt', this.apps_list, '********', this.AdminGameList);

    // console.log('in ****** dialog', typeof (JSON.parse(this.storeData.getLocalStorage('user_apps_list'))));
  }

  ngOnInit() {

  }

  resetGameAppList() {
    if (this.apps_list.length > 0) {
      this.apps_list.forEach((obj:any) => {
        const existNotification = this.AdminGameList.some((x:any) => x.id === obj.id);
        if (existNotification) {
          const index = this.AdminGameList.map((o:any) => o.id).indexOf(obj.id);
          this.AdminGameList.splice(index, 1);
        }
      });
      this.dataSourceGameApp = new MatTableDataSource(this.apps_list);
    }
  }

  GamePermissionDialog(row:any) {
    // if (this.showEdit === true) {
    //   this.snackBar.open('Can Not Edit Game module Parmission Without Edit', 'Dismiss', { duration: 3000 });
    //   return;
    // } else {
    // console.log('In game permission diag', row);
    this.openPermissionDialog(row);
    // }
  }


  openPermissionDialog(selectedObject:any) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.data = {
      selectedObject: selectedObject,
      userId: this.user_id,
      app_id: selectedObject['id']
    };
    const dialogRef = this.dialog.open(PermissionDialogComponent, this.dialogConfig);
  }


  onSubmit() {
    if (this.gameId === '') {
      this.snackBar.open('Please select game to give game permission to user', 'Dismiss', { duration: 3000 });
      return;
    }

    const d = {
      app_id: this.gameId,
    };

    // let m_list: any;
    // const app_module_per = [];

    // this.rest.game_app_details(data).subscribe((gameData) => {
    //   if (gameData.status.code === 200) {

    // m_list = gameData.data.modules;
    // for (const e of m_list) {
    //   app_module_per.push({
    //     'module': e,
    //     'read': true,
    //     'write': true
    //   });
    // }
    // const d = {
    //   app_id: this.gameId,
    // permission: app_module_per
    // };
    // data['permission'] = app_module_per;
    // console.log('in on submit', d);
    this.gamePermission.addNewGamePermission(d, this.user_id).subscribe((res:any) => {
      // console.log('response of permission', res);
      if (res['status'].code === 200) {
        const selectGame = this.AdminGameList.filter((x:any) => x.id === this.gameId);
        if (selectGame.length !== 0) {
          this.apps_list.push({
            id: selectGame[0].id,
            name: selectGame[0].name,
            description: selectGame[0].description,
            //     modules: d.permission.map(x => x.module),
            //     permission: d.permission
          });
        }
        this.resetGameAppList();
        this.dataSourceGameApp = new MatTableDataSource(this.apps_list);
      }
    }, (err) => {
      this.close();
    });
    //   }
    // });
  }

  deleteGame(GameId:any) {
    if (this.showEdit === true) {
      this.snackBar.open('Can Not Delete Game Parmission Without Edit', 'Dismiss', { duration: 3000 });
      return;
    } else {

      const selectGameN = this.apps_list.filter((x:any) => x.id === GameId);
      console.log('Selected Game N', selectGameN);
      if (selectGameN.length !== 0) {
        this.AdminGameList.push({
          id: selectGameN[0].id,
          name: selectGameN[0].name,
          description: selectGameN[0].description
        });
      }

      const data = {
        app_id: GameId
      };

      this.gamePermission.deleteGamePermission(data, this.user_id).subscribe(res => {
        if (res['status'].code === 200) {
          const selectGame = this.AdminGameList.filter((x:any) => x.id === GameId);
          if (selectGame.length !== 0) {
            const index = this.apps_list.map((o:any) => o.id).indexOf(GameId);
            this.apps_list.splice(index, 1);
          }
          this.dataSourceGameApp = new MatTableDataSource(this.apps_list);
          this.snackBar.open('Game Parmission has been removed', 'Dismiss', { duration: 3000 });
        }
      }, (err) => {
        this.close();
      });
    }

  }

  close() {
    this.dialogRef.close();
  }
}



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'viewPermission',
  templateUrl: 'viewPermission.html',
  // tslint:disable-next-line:max-line-length
  styles: ['mat-header-cell { display: flex !important; justify-content: center !important; padding:0px;} mat-cell{padding:0px; display: flex !important; justify-content: center !important;}']
})
export class PermissionDialogComponent implements OnInit {

  dataSourceModulePemApp = new MatTableDataSource<Object>();
  displayedColumns = ['module', 'read', 'write'];
  selectObj: any;
  permission_list:any = [];
  obj = {};
  userId: any;
  app_id: any;
  pem_id: any;
  constructor(
    private gameDetails: GamedetailsService,
    public gamePermission: ManageAccountService,
    private test: TestService,
    private dialogRef: MatDialogRef<PermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
    this.selectObj = data.selectedObject;
    // this.permission_list = data.selectedObject.permission;
    this.userId = data.userId;
    this.app_id = data.app_id;
    // console.log('pem2', pem_module_list);
    // console.log('Selected obj in game permission', this.selectObj);

    const CustomModuleList = this.test.getCustomModuleList();


    this.gamePermission.getUserGameModulePermission(this.selectObj.id, this.userId).subscribe((res:any) => {


      if (res['status'].code === 200) {
        this.permission_list = res['data'].permission;
        this.pem_id = res['data'].id;
        if (this.permission_list === undefined) {
          this.permission_list = [];
        }

        const checkLi = this.selectObj.modules;
        const pemLi = this.permission_list.map((x:any) => x.module); // Crete List Of Permisssion from Permission List of Dict

        if (this.selectObj.custom_modules !== undefined) {
          this.selectObj.custom_modules.forEach((element:any) => {
            if (CustomModuleList.map(x => x.serverKey).includes(element)) {
              const addMo = CustomModuleList.filter(x => x.serverKey === element);
              if (addMo.length !== 0 && pemLi.includes(addMo[0].moduleName) && !this.selectObj.modules.includes(addMo[0].moduleName)) {
                checkLi.push(addMo[0].moduleName);
              }
            }
          });
        }

        if (this.selectObj.modules === undefined) {
          this.gameDetails.game_app_details({ app_id: this.selectObj.id }).subscribe(re => {
            if (re.status.code === 200) {
              const check = re.data.modules;
              if (re.data.custom_modules !== undefined) {
                re.data.custom_modules.forEach((element:any) => {
                  if (CustomModuleList.map(x => x.serverKey).includes(element)) {
                    const addMo = CustomModuleList.filter(x => x.serverKey === element);
                    if (addMo.length !== 0 &&
                      !check.includes(addMo[0].moduleName)) {
                      check.push(addMo[0].moduleName);
                    }
                  }
                });
              }
              this.selectObj.modules = re.data.modules;
              this.permission_list = this.gamePermission.getFinalPermissions(check, this.permission_list, false);
              this.dataSourceModulePemApp = new MatTableDataSource(this.permission_list);
            }
          });
        } else {
          this.permission_list = this.gamePermission.getFinalPermissions(checkLi, this.permission_list, false);
          this.dataSourceModulePemApp = new MatTableDataSource(this.permission_list);
        }

        if (this.selectObj.custom_modules !== undefined) {
          this.selectObj.custom_modules.forEach((ele:any) => {
            CustomModuleList.forEach(element => {
              if (element.serverKey === ele && !this.permission_list.map((x:any) => x.module).includes(element.moduleName)) {
                this.permission_list.push({
                  module: element.moduleName,
                  read: false,
                  write: false
                });
              }
            });
          });
        }


        // const pem_module_list = this.permission_list.map(x => x.module);

        // for (const e of data.selectedObject.modules) {
        //   if (!pem_module_list.includes(e)) {
        //     this.permission_list.push({
        //       'module': e,
        //       'read': false,
        //       'write': false
        //     });
        //   }
        // }

      }
    });
  }

  ngOnInit() {
  }

  OnUserlistChange(event: any, type:any) {
    const obj:any = this.permission_list.filter((x:any) => x.module === event.source.value.module);
    if (obj.length !== 0) {
      if (type === 'read') {
        obj[0].read = event.checked;
      } else if (type === 'write') {
        obj[0].read = event.checked;
        obj[0].write = event.checked;
      }
    }
  }


  submit() {

    const d = {
      app_id: this.selectObj.id,
      permission: this.permission_list
    };
    console.log('Submit User Permission', d);
    // this.gamePermission.addNewGamePermission(d, this.userId).subscribe(res => {
    //   console.log('response of permission', res);
    //   if (res['status'].code === 200) { }
    // });
    this.gamePermission.setUserGameModulePermission(d, this.pem_id).subscribe((res:any) => {
      if (res['status'].code === 200) {
        console.log('saved');
        this.dialogRef.close();
      }
    });

  }

  close() {
    this.dialogRef.close();
  }
}
