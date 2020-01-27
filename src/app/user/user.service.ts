import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, observable, Observer } from 'rxjs';
import { UserEntity } from './user.entity';
import { ProfileEntity } from './profile.entity';
import { catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
   users: UserEntity [] ;
observer: Observer<UserEntity>;
  getActiveUsersUrl = 'http://localhost:8080/user/findAllActive';

  createUrl = 'http://localhost:8080/user/createUserByAdmin/';

  constructor(private httpClient: HttpClient) { }



  getActiveUsers(): Observable<any> {
    console.log('>>>>>>>>>>>> :' + sessionStorage.getItem('token'));
    console.log('>>>>>>>>>>>> :' + sessionStorage.getItem('username'));


   /* const  httpOptions = {
     headers : new HttpHeaders({
        'content-type': 'application/json',
       Authorization: sessionStorage.getItem('token')
      })
    };*/

    return  this.httpClient.get<any>(this.getActiveUsersUrl);

  }

  createUser(user: UserEntity, profile: ProfileEntity): Observable<UserEntity> {
    return
    this.httpClient.post<UserEntity>(this.createUrl, user, httpOptions)
        .pipe(

    );


  }

  private handleError(error: HttpErrorResponse) {
    // frontend error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred', error.error.message);
    } else {
      console.error(`Mtoca API send back and error: ${error.status},
       ` + `details: ${error.error} `);
    }
  }



}

