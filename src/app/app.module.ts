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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    AccountModule,
    SecurityModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'allusers', component: UserGetComponent},
      {path: 'allAccounts', component: AccountGetComponent},
      {path: 'createUser', component: UserAddComponent},
      {path: 'getProfiles', component: ProfileGetComponent},
      {path: 'login', component: LogginComponent},
      {path: 'updateUser', component: UserUpdateComponent},
      {path: '', redirectTo: '/allusers', pathMatch: 'full'}

    ]),
    BrowserAnimationsModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
