import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Router} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserModule } from './user/user.module';
import { SecurityModule } from './security/security.module';
import { UserGetComponent } from './user/user-get/user-get.component';
import { UserService } from './user/user.service';
import { LogginComponent } from './security/loggin/loggin.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { ProfileGetComponent } from './user/profile-get/profile-get.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountGetComponent } from './account/account-get/account-get.component';
import { AccountModule } from './account/account.module';
import { MusicCreateComponent } from './item/music-create/music-create.component';
import { ItemModule } from './item/item.module';
import { MusicGetComponent } from './item/music-get/music-get.component';
import { MusicLoadContentComponent } from './item/music-load-content/music-load-content.component';
import { MusicUpdateComponent } from './item/music-update/music-update.component';
import { MusicDeleteComponent } from './item/music-delete/music-delete.component';
import { JobsGetComponent } from './item/jobs-get/jobs-get.component';
import { MusicGetReadOlnyComponent } from './item/music-get-read-olny/music-get-read-olny.component';
import { ResetPasswordComponent } from './security/request-reset-password/request-reset-password.component';
import { BoughtItemsComponent } from './account-items/bought-items/bought-items.component';
import { AccountItemsModule } from './account-items/account-items.module';
import { YesNoPipe } from './generic/yes-no.pipe';
import { NumbersPerItemComponent } from './account-items/numbers-per-item/numbers-per-item.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GroupsPerJobComponent } from './account-items/groups-per-job/groups-per-job.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,YesNoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    ItemModule,
    AccountModule,
    SecurityModule,
    ReactiveFormsModule,
    AccountItemsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      {path: 'all-users', component: UserGetComponent},
      {path: 'all-accounts', component: AccountGetComponent},
      {path: 'create-user', component: UserAddComponent},
      {path: 'get-profiles', component: ProfileGetComponent},
      {path: 'login', component: LogginComponent},
      {path: 'update-user', component: UserUpdateComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'get-music', component: MusicGetComponent},
      {path: 'create-music', component: MusicCreateComponent},
      {path: 'load-content', component: MusicLoadContentComponent},
      {path: 'update-music', component: MusicUpdateComponent},
      {path: 'delete-music', component: MusicDeleteComponent},
      {path: 'get-jobs', component: JobsGetComponent },
      {path: 'get-music-read-only', component: MusicGetReadOlnyComponent },
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'account-item-all', component: BoughtItemsComponent},
      {path: 'nr-account-items-per-item', component: NumbersPerItemComponent},
      {path: 'nr-account-items-per-job', component: GroupsPerJobComponent}


    ]),
    BrowserAnimationsModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
