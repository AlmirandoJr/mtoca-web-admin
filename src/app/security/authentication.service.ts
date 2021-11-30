import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, first, catchError, isEmpty } from 'rxjs/operators';

import { UserEntity } from '../user/user.entity';
import { Observable, of, empty } from 'rxjs';
import { AppConfig } from '../generic/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username: string;
  password: string;
  usersUrl = AppConfig.API_URL+'/users';
  authenticated = false;
  adminLoggedin = false;
  operatorLoggedin = false;
  uploaderLoggedin = false;
  artistLoggedin = false;
  customeroggedin = false;
  user: UserEntity =null;



  error: Error;
  loggedIn:boolean = false;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {


    this.username = username;
    this.password = password;

    const token = btoa(username + ':' + password);
    const base64Token = 'Basic ' + token;

    const httpOptions = {
      headers: new  HttpHeaders({
        'Content-type': 'application/json',
         Authorization: base64Token
      })
    };

    return this.http.get<UserEntity>(`${this.usersUrl}/user-data`, httpOptions)
        .pipe( map (x => {
          sessionStorage.setItem('username', username);
          this.username = username;
          this.password = password;
          this.user = x;
           if(x.profile.name==='ADMIN'){
            this.adminLoggedin = true;
            this.operatorLoggedin = false;
            this.uploaderLoggedin = false;
            this.artistLoggedin = false;
            this.customeroggedin = false;

           }else if(x.profile.name==='OPERATOR'){
            this.adminLoggedin = false;
            this.operatorLoggedin = true;
            this.uploaderLoggedin = false;
            this.artistLoggedin = false;
            this.customeroggedin = false;

           }else if(x.profile.name==='UPLOADER'){
            this.adminLoggedin = false;
            this.operatorLoggedin = false;
            this.uploaderLoggedin = true;
            this.artistLoggedin = false;
            this.customeroggedin = false;
             
           }else if(x.profile.name==='ARTIST'){

            this.adminLoggedin = false;
            this.operatorLoggedin = false;
            this.uploaderLoggedin = false;
            this.artistLoggedin = true;
            this.customeroggedin = false;
          } else if(x.profile.name==='CUSTOMER'){
            this.adminLoggedin = false;
            this.operatorLoggedin = false;
            this.uploaderLoggedin = false;
            this.artistLoggedin = false;
            this.customeroggedin = true;
             
          }

        })  );

  }

  isLoggenIn() {
    if ( sessionStorage.getItem('username')  === null ) {
          this.loggedIn = false;
          return this.loggedIn;

    }
    this.loggedIn = true;
    return this.loggedIn;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.username = null;
    this.password = null;
    this.loggedIn = false;
  }

  isAdminLoggedin(){
    return this.adminLoggedin;
  }
  isOperatorLoggedin(){
    return this.operatorLoggedin;
  }
  isUploaderLoggedin(){
    return this.uploaderLoggedin;
  }
  isArtistLoggedin(){
    return this.artistLoggedin;
  }
  isCustomerLoggedin(){
    return this.customeroggedin;
  }

  resetPassword(username: string, otp: string){
    return this.http.put(`${this.usersUrl}/password-reset?username=${username}&otp:${otp}`,{});
  }

  requestResetPassword(username: string){
    return this.http.post(`${this.usersUrl}//password-reset-request?username=${username}`,{});
  }

}
