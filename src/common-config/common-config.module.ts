import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonConfigComponent } from './common-config.component';
import { CommonConfigRoutes } from './common-config.routing';
import { MaterialModule } from 'src/app/material.module';
import { SignInComponent } from './SignIn/SignIn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialNavbarComponent } from './material-navbar/material-navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DeleteDialogComponent } from './deleteDialog/deleteDialog.component';



@NgModule({
  imports: [
    CommonModule,
    CommonConfigRoutes,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CommonConfigComponent,
    SignInComponent,
    MaterialNavbarComponent,
    BreadcrumbComponent,
    DeleteDialogComponent
  ],
  exports: [
    MaterialNavbarComponent,
    BreadcrumbComponent
  ]
})
export class CommonConfigModule { }
