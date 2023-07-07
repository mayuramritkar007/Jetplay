import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { ShellRoutes } from './shell.routing';
import { CommonConfigModule } from 'src/common-config/common-config.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonShellModule } from './common/common.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonShellModule,
    ShellRoutes,
    CommonConfigModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    ShellComponent,
    
  ]
})
export class ShellModule { }
