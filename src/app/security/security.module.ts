import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogginComponent } from './loggin/loggin.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpinterceptorService } from './httpinterceptor.service';



@NgModule({
  declarations: [LogginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
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
