import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { MusicEntity } from './music';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient) { }

  itemsURI = 'http://localhost:9090/items';


  getmusic() {

    return this.httpClient.get(this.itemsURI)
              .pipe(catchError(e => { throw new  Error('' + e.message); }));
  }

  saveMusic(music: MusicEntity,  usernane:string ){
    return this.httpClient.post(`${this.itemsURI}/${usernane}`,music);
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
  updateMusic(music:MusicEntity){
    return this.httpClient.put(`${this.itemsURI}`,music);
  }

  deleteMusic(itemCode: string){
    return this.httpClient.delete(`${this.itemsURI}/${itemCode}`);

  }

}
