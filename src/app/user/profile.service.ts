import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileEntity } from './profile.entity';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../generic/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileUrl = AppConfig.API_URL+'/profiles';

  constructor(private httpClient: HttpClient) { }

  getProfiles(): Observable<any> {

  const httpOptons = {
    headers : new  HttpHeaders ({
      'Content-type': 'application/json',
      Authorization: sessionStorage.getItem('token')
    })
  };
  return this.httpClient.get(`${this.profileUrl}`);
  }

  getProfileByName(name: string): Observable<any> {

    return this.httpClient.get(`${this.profileUrl}/${name}`);
  }
}
