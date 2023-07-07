import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent  } from './Dashboard/Dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListUserAccountComponent, PermissionDialogComponent, ViewManageAccountComponent } from './list-user-account/list-user-account.component';
import { ManageAccountComponent } from './manageAccount/manageAccount.component';


@NgModule({
  declarations: [ 
    HomeComponent,
    DashboardComponent,
    // ModuleDialogComponent
    ListUserAccountComponent,
    ManageAccountComponent,
    ViewManageAccountComponent,
    PermissionDialogComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
  
})
export class CommonShellModule { }
