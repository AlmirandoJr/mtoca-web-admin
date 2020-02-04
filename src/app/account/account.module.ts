import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGetComponent } from './account-get/account-get.component';
import { UpdateAccountModalComponent } from './update-account-modal/update-account-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ AccountGetComponent, UpdateAccountModalComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  entryComponents: [UpdateAccountModalComponent]
})
export class AccountModule { }
