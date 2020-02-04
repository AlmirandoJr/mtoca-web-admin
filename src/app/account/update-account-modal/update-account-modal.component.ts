import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountEntity } from '../account-entity';
import { AccountService } from '../account.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-account-modal',
  templateUrl: './update-account-modal.component.html',
  styleUrls: ['./update-account-modal.component.css']
})
export class UpdateAccountModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateAccountModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AccountEntity,
              private accountService: AccountService,
              private formBuilder: FormBuilder) { }

  form = this.formBuilder.group({
    amount: [''],
    description: ['']
  });

  ngOnInit() {
  }

  updateBalance() {

    this.accountService.updateAccount( this.data,
                                       this.form.value.amount,
                                       this.form.value.description)
      .subscribe(x => { },
        e => { console.error(e.message); });

    this.dialogRef.close();

  }

  cancel() {
    this.dialogRef.close();
  }

}
