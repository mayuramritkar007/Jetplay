import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileRoutes } from './Userprofile.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserSegmentComponent } from './User-segment/User-segment.component';



@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserprofileRoutes    
  ],
  declarations: [
    UserprofileComponent,
    UserSegmentComponent]
})
export class UserprofileModule { }
