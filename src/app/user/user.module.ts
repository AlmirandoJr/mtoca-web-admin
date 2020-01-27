import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { UserGetComponent } from './user-get/user-get.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileGetComponent } from './profile-get/profile-get.component';



@NgModule({
  declarations: [UserAddComponent,
    UserGetComponent,
    ProfileGetComponent
  ],
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule
  ],
  exports: [UserAddComponent,
    UserGetComponent
  ]
})
export class UserModule { }
