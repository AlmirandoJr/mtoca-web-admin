import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGetComponent } from './account-get/account-get.component';
import { UpdateAccountModalComponent } from './update-account-modal/update-account-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountStatementComponent } from './account-statement/account-statement.component';



@NgModule({
  declarations: [ AccountGetComponent, UpdateAccountModalComponent, AccountStatementComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  entryComponents: [UpdateAccountModalComponent, AccountStatementComponent]
})
export class AccountModule { }
