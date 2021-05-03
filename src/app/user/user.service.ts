import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, empty, observable, Observer } from 'rxjs';
import { UserEntity } from './user.entity';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../generic/app.config';


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
  private userEndpointUrl = AppConfig.API_URL+'/users';



  constructor(private httpClient: HttpClient) { }



  getActiveUsers(): Observable<any> {

    return  this.httpClient.get<any>(this.userEndpointUrl);

  }

  findUserByUSername(username: string) {

   return this.httpClient.get<UserEntity>(`${this.userEndpointUrl}/${username}`)
      .pipe(map( x =>  x ));

  }

  findUsersByProfileName(profileName: string) {

    return this.httpClient.get(`${this.userEndpointUrl}/by-profile/${profileName}`)
       .pipe(map( x =>  x ));
 
   }

   findAuthors() {

    return this.httpClient.get(`${this.userEndpointUrl}/author`)
       .pipe(map( x =>  x ));
 
   }

  createUser(user: UserEntity,profileName: string)  {
    return this.httpClient.post<UserEntity>(`${this.userEndpointUrl}/${profileName}`, user );

  }

  updateUser(user: UserEntity, profile: string) {
 
    return this.httpClient
        .put(`${this.userEndpointUrl}/${profile}`, user);
          
  }

  updateUserByHimSelf(user: UserEntity){
    return this.httpClient
      .put(`${this.userEndpointUrl}/self-user-data`,user).pipe(map(x=>{},err=>{}));
  }


  inactivateUser(username: string) {

    return this.httpClient.delete(`${this.userEndpointUrl}/${username}`)
      .pipe(map( x =>   x ),
      catchError (e => { throw new Error('ocorreu um erro ao apagar o user ' + username + e.message); }));
    }

  changePassword(username, oldPass, newPass){

    const httpRequest = new HttpRequest('PUT',
    `${this.userEndpointUrl}/password-change/${username}?oldPassword=${oldPass}&newPassword=${newPass}`,{});

    return this.httpClient.request(httpRequest);

  }

  uploadPhoto(username: string,formData: FormData):  Observable<HttpEvent<{}>>{

    const httpRequest= new HttpRequest('POST',
          `${this.userEndpointUrl}/photo/${username}`,
            formData,
            {reportProgress:true,
              responseType: 'text'});
  
    return   this.httpClient.request(httpRequest);
     
  }

  downLoadPhoto(username: string):Observable<Blob>{

    return this.httpClient.get(`${this.userEndpointUrl}/photo/${username}`,
      {responseType: 'blob'});
     
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

