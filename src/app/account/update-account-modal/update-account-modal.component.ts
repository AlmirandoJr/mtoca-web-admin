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

  success :boolean=false;
  failture :boolean=false;
  successMessage:string = `Saldo da conta ` + this.data.code+` actualizado com sucesso`;
  errorMessage:string = `Erro ao actualizar o saldo da conta: ` + this.data.code+``;
   

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

    if(this.data.user.profile.hasOwnProperty('hibernateLazyInitializer')){
      delete  this.data.user.profile.hibernateLazyInitializer;
    }

    this.accountService.updateAccount( this.data,
                                       this.form.controls.amount.value,
                                       this.form.controls.description.value)
      .subscribe(x => {this.success =true;
      this.failture=false;
    this.form.reset(); },
        e => { this.failture=true;
          console.error(e); });
  }

  cancel() {
    this.dialogRef.close();
  }

}
