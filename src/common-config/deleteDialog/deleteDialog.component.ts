import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteDialog',
  templateUrl: './deleteDialog.component.html',
  styleUrls: ['./deleteDialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  title: any = 'Delete Record?';
  body: any = 'Are you sure you want to delete this item?';
  response = false;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,

    @Inject(MAT_DIALOG_DATA) data:any) {
    if (data.title) {
      this.title = data.title;
    }
    if (data.body) {
      this.body = data.body;
    }
  }

  ngOnInit() {
  }

  close() {
    this.response = false;
    this.dialogRef.close(this.response);
  }

  accept() {
    this.response = true;
    this.dialogRef.close(this.response);
  }

}
