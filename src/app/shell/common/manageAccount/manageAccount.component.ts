import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { MustMatch } from 'src/core/Validator/matchingPassword';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManageAccountService } from 'src/core/services/manageaccount.service';

@Component({
  selector: 'app-manageAccount',
  templateUrl: './manageAccount.component.html',
  styleUrls: ['./manageAccount.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ManageAccountComponent>,
    private formBuilder: UntypedFormBuilder,
    private manageaccount: ManageAccountService,
    public snackBar: MatSnackBar) { }

  NewMemberForm: any;
  disabledAgreement = true;
  public hide = false;

  ngOnInit() {
    this.NewMemberForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // company_name: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobile_number: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

  }

  CheckMobileLength(event:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || event.target.value.length >= 10) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.NewMemberForm.invalid) {
      Object.keys(this.NewMemberForm.controls).forEach(field => { // {1}
        const control = this.NewMemberForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
      return;
    }
    delete this.NewMemberForm.value['confirmPassword'];
    this.registerMember();
  }

  registerMember() {
    this.manageaccount.addNewMember(this.NewMemberForm.value).subscribe((response:any) => {
      if (response['status'].code === 200) {
        this.snackBar.open('New Member added Successfully', 'Dismiss', { duration: 3000 });
        this.dialogRef.close();
      } else {
        this.snackBar.open('Member not added', 'Dismiss', { duration: 3000 });
      }
    },
      (error:any) => {
        this.dialogRef.close();
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
