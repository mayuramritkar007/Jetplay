import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../app/material.module';

// import { MaterialNavbarComponent } from './material-navbar/material-navbar.component';
// import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
// import { CreateMessageInboxComponent } from './shared/createMessageInbox/createMessageInbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
    declarations: [
        // MaterialNavbarComponent,
        // DeleteDialogComponent,
        // CreateMessageInboxComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        CoreRoutingModule,
    ],
    exports: [
        
    ]
})
export class CoreModule { }
