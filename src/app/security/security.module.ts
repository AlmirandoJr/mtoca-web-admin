import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogginComponent } from './loggin/loggin.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpinterceptorService } from './httpinterceptor.service';
import { ResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ValidadeOtpComponent } from './validade-otp/validade-otp.component';



@NgModule({
  declarations: [LogginComponent, ResetPasswordComponent, ValidadeOtpComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true
    }
  ]
})


export class SecurityModule { }
