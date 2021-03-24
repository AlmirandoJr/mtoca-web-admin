import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { UserGetComponent } from './user-get/user-get.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileGetComponent } from './profile-get/profile-get.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserUpdateSelfDataComponent } from './user-update-self-data/user-update-self-data.component';
import { UserUpdateSelfPhotoComponent } from './user-update-self-photo/user-update-self-photo.component';


@NgModule({
  declarations: [UserAddComponent,
    UserGetComponent,
    ProfileGetComponent,
    UserUpdateComponent,
    DeleteUserModalComponent,
    ChangePasswordComponent,
    UserUpdateSelfDataComponent,
    UserUpdateSelfPhotoComponent
  ],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [UserAddComponent,
    UserGetComponent
  ],
  entryComponents: [DeleteUserModalComponent]
})
export class UserModule { }
