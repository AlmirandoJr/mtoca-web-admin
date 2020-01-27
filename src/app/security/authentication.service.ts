import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

import { UserEntity } from '../user/user.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userUrl = 'http://localhost:8080/user/findByUsername';
  authenticated = false;

  username: string;

  password: string;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): boolean {

    this.username = username;
    this.password = password;

    const base64Token = 'Basic ' + btoa(username + ':' + password);

    const httpOptions = {
      headers: new  HttpHeaders({
        'Content-type': 'application/json',
         Authorization: base64Token
      })
    };

    this.http.get<UserEntity>(`${this.userUrl}/${username}`, httpOptions);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', base64Token);


    if ( base64Token.length > 29) {
      this.authenticated = true;
    }

    return this.authenticated;
  }

  isLoggenIn() {
    if ( this.authenticated ) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    this.authenticated = false;
  }

}
