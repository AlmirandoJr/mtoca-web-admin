import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, observable, Observer } from 'rxjs';
import { UserEntity } from './user.entity';
import { ProfileEntity } from './profile.entity';
import { catchError, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { ConstantPool } from '@angular/compiler';

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
  private getActiveUsersUrl = 'http://localhost:8080/user/findAllActive';

  private createUserUrl = 'http://localhost:8080/user/createUser/';

  private findUserByUrlUSername = 'http://localhost:8080/user/findByUsername';

  private updateUserUrl = 'http://localhost:8080/user/updateUser';

  private inactivateUSerUrl = 'http://localhost:8080/user/inactivateUser';


  constructor(private httpClient: HttpClient) { }



  getActiveUsers(): Observable<any> {

    return  this.httpClient.get<any>(this.getActiveUsersUrl);

  }

  findUserByUSername(username: string) {

   return this.httpClient.get<UserEntity>(`${this.findUserByUrlUSername}/${username}`)
      .pipe(map( x =>  x ));

  }

  createUser(user: UserEntity)  {
    this.httpClient.post<UserEntity>(this.createUserUrl, user )
          .subscribe( null, error => console.log(error.message), null);


    return new Observable<UserEntity>();

  }

  updateUser(user: UserEntity, profile: ProfileEntity) {
    console.log('### ' + profile.id);
    console.log('### ' + profile.name);
    return this.httpClient.put(`${this.updateUserUrl}/${profile.id}`, user);
  }


  inactivateUser(username: string) {

    return this.httpClient.delete(`${this.inactivateUSerUrl}/${username}`)
      .pipe(map( x =>   x ),
      catchError (e => { throw new Error('ocorreu um erro ao apagar o user ' + username + e.message); }));
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

