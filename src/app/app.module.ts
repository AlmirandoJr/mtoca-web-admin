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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    SecurityModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'allusers', component: UserGetComponent},
      {path: 'createUser', component: UserAddComponent},
      {path: 'getProfiles', component: ProfileGetComponent},
      {path: 'login', component: LogginComponent}

    ])

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
