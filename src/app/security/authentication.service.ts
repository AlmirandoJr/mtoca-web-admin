import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, first, catchError, isEmpty } from 'rxjs/operators';

import { UserEntity } from '../user/user.entity';
import { Observable, of, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username: string;
  password: string;
  userUrl = 'http://localhost:8080/user/findByUsername';
  authenticated = false;


  error: Error;

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

    return this.http.get<UserEntity>(`${this.userUrl}/${username}`, httpOptions)
        .pipe( map (x => {
          sessionStorage.setItem('username', username);
          this.username = username;
          this.password = password;
        })  );

  }

  isLoggenIn() {
    if ( sessionStorage.getItem('username')  === null ) {
     return false;
    }
    return true;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.username = null;
    this.password = null;
  }

}
