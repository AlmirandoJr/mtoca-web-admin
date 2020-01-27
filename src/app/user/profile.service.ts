import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileEntity } from './profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileList = 'http://localhost:8080/profile';

  constructor(private httpClient: HttpClient) { }

  getProfiles(): Observable<any> {

  /*const httpOptons = {
    headers : new  HttpHeaders ({
      'Content-type': 'application/json',
      Authorization: sessionStorage.getItem('token')
    })
  };*/
  return this.httpClient.get(`${this.profileList}`);
  }

  getProfileByName(name: string): Observable<any> {
    return this.httpClient.get('http://localhost:8080/profile/findByName/' + name);
  }
}
