import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { ItemEntity } from './item.entity';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../generic/app.config';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient) { }

  itemsURI = AppConfig.API_URL+'/items';


  getmusic() {

    return this.httpClient.get(this.itemsURI)
              .pipe(catchError(e => { throw new  Error('' + e.message); }));
  }

  saveMusic(music: ItemEntity,  jobCode: string ){
    return this.httpClient.post(`${this.itemsURI}/${jobCode}`,music);
  }

  uploadPhoto(code: String,formData: FormData):  Observable<HttpEvent<{}>>{

    const httpRequest= new HttpRequest('POST',
          `${this.itemsURI}/photo/${code}`,
            formData,
            {reportProgress:true,
              responseType: 'text'});
  
  return   this.httpClient.request(httpRequest);
  
         
  }

  uploadMusic(code: String,formData: FormData): Observable<HttpEvent<{}>>{
    

    const httpRequest= new HttpRequest('POST',
          `${this.itemsURI}/content/${code}`,
            formData,
            {reportProgress:true,
              responseType: 'text'});
  
    return   this.httpClient.request(httpRequest);
  
  
  }
  updateMusic(music:ItemEntity){
    return this.httpClient.put(`${this.itemsURI}`,music);
  }

  deleteMusic(itemCode: string){
    return this.httpClient.delete(`${this.itemsURI}/${itemCode}`);

  }

}
