import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialNavbarComponent } from 'src/common-config/material-navbar/material-navbar.component';
import { CommonService } from 'src/core/services/common.service';
import { ConfirmationService } from 'src/core/services/confirmation.service';
import { GameconfigureService } from 'src/core/services/gameconfigure.service';
import { GamedetailsService } from 'src/core/services/gamedetails.service';
import { SharingDataService } from 'src/core/services/SharingdataService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild('myImage')
  my_image!: ElementRef;
  select_game: any;
  select_game_key: any;
  game_key_flag: boolean = false;
//   get_game_key: any;
  default_game_key:string = '***********************************';
  appSummary: {[key:string]:string} = {};
  // appDetails:object={};
//   features_list: any = [];
//   public colCount: number = 2;
//   public feature_col_count: number = 4;
//   moduleDisable: boolean = true;
  public spinnerActive: boolean = true;
  public base_url: any = null;
//   public current_user = JSON.parse(this.storeData.getLocalStorage('current_user'));
//   dialogConfig: any;
//   image_height = '50px';

//   @ViewChild('grid', { static: true })
//   g!: ElementRef;

  constructor(
    private storeData: SharingDataService,
    public rest: GamedetailsService,
    public gameConfig: GameconfigureService,
//     public router: Router,
//     private dialog: MatDialog,
//     private mate: MaterialNavbarComponent,
    private snackbar: MatSnackBar,
    private confirm: ConfirmationService) {
    // this.select_game = JSON.parse(localStorage.getItem('Current game'));
    console.log('in Dashboard');
    this.storeData.setData('');
    localStorage.getItem('current_game') !== null ? this.select_game = JSON.parse(this.storeData.getLocalStorage('current_game'))
      : this.select_game = null;
  }

  ngOnInit() {
    // this.modules_list();
    // this.select_game_key = this.default_game_key;
    
    setTimeout(() => {
      this.getSummary();  
    }, 2000);
//     this.resize_item(window.innerWidth);
    this.base_url = environment.apiUrl + '/v2/play/jet-admin/app/image/';
  }

  // getOverlayHeight() {
  //   // console.log(this.my_image);
  //   return { 'height': this.my_image ? this.my_image.nativeElement.offsetHeight + 'px' : this.image_height };
  // }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: { target: { innerWidth: any; }; }) {
//     this.resize_item(event.target.innerWidth);
//     // this.image_height = this.elementView.nativeElement.offsetHeight;
//   }

//   resize_item(width: number) {
//     if (width >= 1367) {
//       this.colCount = 4;
//       this.feature_col_count = 5;
//     } else if (width > 1240) {
//       this.colCount = 3;
//       this.feature_col_count = 5;
//     } else if (width > 930) {
//       this.colCount = 3;
//       this.feature_col_count = 4;
//     } else if (width > 768) {
//       this.colCount = 3;
//       this.feature_col_count = 3;
//     } else if (width > 620) {
//       this.colCount = 3;
//       this.feature_col_count = 3;
//     } else if (width > 540) {
//       this.colCount = 2;
//       this.feature_col_count = 3;
//     } else if (width > 460) {
//       this.colCount = 2;
//       this.feature_col_count = 2;
//     } else if (width > 400) {
//       this.colCount = 1;
//       this.feature_col_count = 2;
//     } else {
//       this.colCount = 1;
//       this.feature_col_count = 1;
//     }
//   }



  upload(e: any) {
    const gameLogo  = e.target.files;
    let reader = new FileReader();
    const fileSize = e.target.files[0].size / 1024;
    if (fileSize > 1024) {
      this.my_image.nativeElement.value = '';
      this.snackbar.open('Image sould not be more than 1 mb', 'Dismiss', { duration: 3000 });
      return;
    }

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      if (gameLogo) {
        const formData = new FormData();
        formData.append('image', gameLogo[0], gameLogo[0].name);
        this.gameConfig.updateGameLogo(this.select_game['data'].id, localStorage.getItem('GameKey'), formData).subscribe((resp: { [x: string]: { [x: string]: any; }; }) => {
          this.select_game['data'].image = resp['data']['image'];
          // localStorage.setItem('Current game', JSON.stringify(this.select_game));
          this.storeData.setLocalStorage('current_game', JSON.stringify(this.select_game), 'dashboard');
          // this.storeData.setLocalStorage('current_game', JSON.stringify(this.select_game));
          this.snackbar.open('Image updated successfully', 'Dismiss', { duration: 3000 });
        });
      }
    };
    // this.uploadedImage = files[0]
  }

  deleteLogo() {
    const title = 'Delete Game Image?';
    const body = 'Are you sure you want to delete game image?';

    this.confirm.confirmation(title, body).subscribe((response: boolean) => {
      if (response === true) {
        this.gameConfig.deleteGameLogo(this.select_game['data'].id, localStorage.getItem('GameKey')).subscribe((resp: any) => {
          this.snackbar.open('Image Deleted', 'Dismiss', { duration: 2000 });
          this.select_game['data'].image = 'None';
          // localStorage.setItem('Current game', JSON.stringify(this.select_game));
          this.storeData.setLocalStorage('current_game', JSON.stringify(this.select_game), 'dashboard');
          // this.storeData.setLocalStorage('current_game', JSON.stringify(this.select_game));
        });
      }
    });
  }

//   // getLinkPicture(){
//   //   const img = ;
//   //   return img;
//   // }

//   getStyle() {
//     const width: any = {
//       1: '100% ',
//       2: '50% ',
//       3: '33% ',
//       4: '25% ',
//       5: '20%'
//     };
//     const mystyle = {
//       'margin-top': '2%',
//       'display': 'inline-grid',
//       'width': '100%',
//       'grid-gap': '15px',
//       'grid-template-columns': Array(this.colCount + 1).join(width[this.colCount])
//     };
//     return mystyle;
//   }


//   getFeatureStyle() {
//     const width: any = {
//       1: '100% ',
//       2: '50% ',
//       3: '33% ',
//       4: '25% ',
//       5: '20%'
//     };
//     const mystyle = {
//       'margin-top': '2%',
//       'display': 'inline-grid',
//       'grid-template-columns': Array(this.feature_col_count + 1).join(width[this.feature_col_count])
//     };
//     return mystyle;
//   }

  GetGameKey(val: boolean) {
    this.game_key_flag = val;
    if (this.game_key_flag === true) {
      this.select_game_key = localStorage.getItem('GameKey');
      if (this.select_game_key === null || this.select_game_key === undefined) {
        const app_details:any = {};
        app_details['app_id'] = this.select_game['data'].id;
        this.rest.getSecretKey(app_details).subscribe((secretKey: { data: { [x: string]: any; }; }) => {
          localStorage.setItem('GameKey', secretKey.data['secret_key']);
          this.select_game_key = secretKey.data['secret_key'];
        });
      }
    } else {
      this.select_game_key = this.default_game_key;
    }
  }

//   modules_list() {
//     return this.gameConfig.features().subscribe((response: any) => {
//       this.features_list = response.data;
//       const used_module = this.select_game['data'].modules;
//       // this.features_list = this.features_list.filter((x: any) => used_module === x.name);
//       // tslint:disable-next-line:prefer-for-of
//       for (let index = 0; index < this.features_list.length; index++) {
//         this.features_list[index]['used'] = false;
//         // tslint:disable-next-line:prefer-for-of
//         for (let index_1 = 0; index_1 < used_module.length; index_1++) {
//           if (this.features_list[index].name === used_module[index_1]) {
//             this.features_list[index]['used'] = true;
//           }
//         }
//       }
//     });
//   }

  getSummary() {
    this.rest.getAppSummary(this.select_game['data'].id).subscribe(response => {
      if (response.status.code === 200) {
        this.spinnerActive = false;
        delete response.data['user_profile'].active
        this.appSummary = response['data'];
        this.storeData.setLocalStorage('app_summary', JSON.stringify(this.appSummary));
        // localStorage.setItem('app_summary', JSON.stringify(this.appSummary));
        console.log('in dash',this.appSummary);
        
        //  this.appSummary['user_profile'].active;
        // this.appDetails = this.appSummary;
        // this.checkAppSummary();
      }
    });
  }

  // checkAppSummary() {
  //   const checkApp = this.features_list.filter((x: any) => x.used === true).map((y: { name: any; }) => y.name);
  //   Object.keys(this.appSummary).forEach(key => {
  //     let key_check = key.replace('_', '');
  //     if (key === 'currencies') {
  //       key_check = 'wallet';
  //     }
  //     this.appSummary[key]['used'] = checkApp.some((x: string) => x === key_check);
  //   });
  // }

//   ModuleRouting(module_name: any) {
//     if (module_name === 'user_profile') {
//       module_name = module_name.replace('_', '');
//     } else if (module_name === 'currencies') {
//       module_name = 'wallet';
//     }
//     this.router.navigateByUrl('/' + module_name);
//   }

//   moduleDialog() {
//     this.dialogConfig = new MatDialogConfig();
//     this.dialogConfig.disableClose = true;
//     this.dialogConfig.autoFocus = true;
//     this.dialogConfig.hasBackdrop = true;
//     this.dialogConfig.data = {
//       moduleList: this.features_list,
//       app_id: this.select_game['data'].id
//     };
//     const dialogRef = this.dialog.open(ModuleDialogComponent, this.dialogConfig);
//     const app_details: any = {};
//     app_details['app_id'] = this.select_game['data'].id;

//     dialogRef.afterClosed().subscribe((result: any) => {
//       if (result) {
//         this.rest.game_app_details(app_details).subscribe((gameData: { [x: string]: { modules: any; }; }) => {
//           localStorage.removeItem('current_game');
//           // localStorage.setItem('Current game', JSON.stringify(gameData));
//           // setTimeout(() => {
//           this.storeData.setLocalStorage('current_game', JSON.stringify(gameData), 'dashboard');
//           // }, 5000);


//           const used_module = gameData['data'].modules;
//           // tslint:disable-next-line:prefer-for-of
//           for (let index = 0; index < this.features_list.length; index++) {
//             this.features_list[index]['used'] = false;
//             // tslint:disable-next-line:prefer-for-of
//             for (let index_1 = 0; index_1 < used_module.length; index_1++) {
//               if (this.features_list[index].name === used_module[index_1]) {
//                 this.features_list[index]['used'] = true;
//               }
//             }
//           }
//           this.mate.game_modules_list();
//           this.checkAppSummary();
//         });
//         // const new_module = new MaterialNavbarComponent();
//         // new_module.game_modules_list();
//       }
//     });
//   }
// }



// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'moduleList',
//   templateUrl: './moduleList.html',
//   // styleUrls: ['viewRewards.css']
// })
// export class ModuleDialogComponent implements OnInit {

//   moduleList: any = [];
//   public feat_list: any = [];
//   public dependencies: any = {};
//   app_id: any;
//   energyForm: boolean = false;
//   EnergyFormGroup: any;
//   energy: any = {};

//   constructor(
//     private dialogRef: MatDialogRef<ModuleDialogComponent>,
//     private gameConfig: GameconfigureService,
//     private _formBuilder: UntypedFormBuilder,
//     private common: CommonService,
//     private snackBar: MatSnackBar,
//     @Inject(MAT_DIALOG_DATA) data: any) {
//     this.moduleList = JSON.parse(JSON.stringify(data.moduleList));
//     this.app_id = data.app_id;
//   }

//   ngOnInit() {
//     this.EnergyFormGroup = this._formBuilder.group({
//       energy_per_interval: 0,
//       default_max_energy: 0,
//       interval_time: 0,
//       notify_energy_received: false
//     });
//     this.moduleList.forEach((e: any) => {
//       // console.log('eeee', e);

//       if (e.used === true) {
//         if (e.name === 'energy') {
//           this.common.listJetVaribles().subscribe((response: { data: { ENERGY_PER_INTERVAL?: any; DEFAULT_MAX_ENERGY?: any; INTERVAL_TIME?: any; NOTIFY_ENERGY_RECEIVED?: any; }; }) => {
//             this.energy = response.data;
//             // console.log('list of Jet Variables', this.energy);
//             this.EnergyFormGroup.patchValue({
//               energy_per_interval: response.data.ENERGY_PER_INTERVAL,
//               default_max_energy: response.data.DEFAULT_MAX_ENERGY,
//               interval_time: response.data.INTERVAL_TIME,
//               notify_energy_received: response.data.NOTIFY_ENERGY_RECEIVED
//             });
//           });
//         }

//         this.OnChange(true, e.name, 'ts');

//       }
//     });
//     // this.energyForm = false;
//   }

//   UsedModule() {
//     this.moduleList.forEach((element: any) => {
//       if (element.required) {
//         if (this.feat_list.indexOf(element.name) === -1) {
//           this.feat_list.push(element.name);
//         }
//       }
//     });
//   }

//   checkEnergy() {
//     const default_energy = this.EnergyFormGroup.get('default_max_energy').value;
//     if (default_energy !== undefined || default_energy !== null) {
//       const energy_per = this.EnergyFormGroup.get('energy_per_interval').value;
//       if (default_energy < energy_per) {
//         this.EnergyFormGroup.get('energy_per_interval').setValue('');
//         this.snackBar.open('Energy per interval can not greater than default max energy', 'Dismiss', { duration: 3000 });
//       }
//     }
//   }

//   OnChange(checked: boolean, value: string, source: string) {
//     if (value === 'energy') {
//       if (checked) {
//         this.energyForm = true;
//       } else {
//         this.energyForm = false;
//         this.EnergyFormGroup.patchValue({
//           energy_per_interval: 0,
//           default_max_energy: 0,
//           interval_time: 0,
//           notify_energy_received: false
//         });
//       }
//     }

//     if (checked === true) {
//       if (!this.feat_list.includes(value)) {
//         this.feat_list.push(value);
//         this.moduleList.forEach((e: any) => {
//           if (value === e.name) {
//             if (source === 'html') {
//               e.used = true;
//             }
//             e.dependencies.forEach((d: string | number) => {
//               try {
//                 if (!this.dependencies[d].includes(value)) {
//                   this.dependencies[d].push(value);
//                 }
//               } catch (exception) {
//                 this.dependencies[d] = [value];
//               }
//             });
//           }
//         });
//       }

//     } else if (checked === false) {
//       if (source === 'html') {
//         this.feat_list.splice(this.feat_list.indexOf(value), 1);
//       }
//       this.moduleList.forEach((e: any) => {
//         if (value === e.name) {
//           if (source === 'html') {
//             e.used = false;
//           }
//           e.dependencies.forEach((d: any) => {
//             try {
//               this.dependencies[d].pop(value);
//             } catch (exception) {
//               // this.dependencies[d] = [value];
//             }
//           });
//         }
//         if (e.name === 'energy' && e.used === true) {
//           this.energyForm = true;
//           this.common.listJetVaribles().subscribe((response: any) => {
//             this.energy = response.data;
//             // console.log('list of Jet Variables', this.energy);
//             this.EnergyFormGroup.patchValue({
//               energy_per_interval: response.data.ENERGY_PER_INTERVAL,
//               default_max_energy: response.data.DEFAULT_MAX_ENERGY,
//               interval_time: response.data.INTERVAL_TIME,
//               notify_energy_received: response.data.NOTIFY_ENERGY_RECEIVED
//             });
//           });
//         }
//       });
//     }
//     Object.keys(this.dependencies).forEach((e: any) => {
//       let required = false;
//       if (this.dependencies[e].length > 0) {
//         required = true;
//       }
//       this.moduleList.forEach((f: any) => {
//         if (f.name === e) {
//           const prev = f.required_by_modules;
//           f.required_by_modules = required;
//           if ((prev !== required) && !f.required) {
//             // Recursive Call
//             this.OnChange(required, f.name, 'ts');
//           }
//         }
//       });
//     });
//   }


//   // Send Final checked module list
//   gameModuleConfig() {
//     this.UsedModule();
//     const upateGameConfig: any = {};
//     upateGameConfig['modules'] = this.feat_list;
//     if (this.energyForm) {
//       upateGameConfig['energy'] = this.EnergyFormGroup.value;
//     }
//     this.gameConfig.updateModuleList(this.app_id, upateGameConfig).subscribe((res: any) => {
//     });
//     this.dialogRef.close(true);
//   }

//   close() {
//     this.dialogRef.close();
//   }

}
