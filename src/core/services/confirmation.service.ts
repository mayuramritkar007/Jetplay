import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/common-config/deleteDialog/deleteDialog.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  dialogConfig: any;
  data: any = false;

  constructor(private dialog: MatDialog) { }

  confirmation(titleDialog: any, messageDialog: any): Observable<any> {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.data = {
      title: titleDialog,
      body: messageDialog
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogConfig);
    return dialogRef.afterClosed();
  }
}
