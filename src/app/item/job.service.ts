import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../generic/app.config';
import { JobEntity } from './job.entity';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  uri :string = AppConfig.API_URL+'/jobs';

  constructor(private httpClient: HttpClient) { }

  createJob( job: JobEntity,username: string ){
    return this.httpClient
      .post(`${this.uri}/${username}`,job)
        .pipe(catchError(e => {throw new  Error('erro ocorreu ao criar novo  trabalho discografico : '+e.message);}));
  }

  getAllJobs(){
    return this.httpClient.get<JobEntity[]>(`${this.uri}`);
  }

  getJobsByType(type: string){
    return this.httpClient.get(`${this.uri}/${type}/type`);
  }

  getJobsByArtist(username: string){
    return this.httpClient.get(`${this.uri}/username/${username}`)
  }

  getJobsTypeAndArtist(type: string, name: string){
    return this.httpClient.get(`${this.uri}/author-and-type/${name}/${type}`);
  }

  getJobtypes(){
    return this.httpClient.get(`${this.uri}/job-types`)
  }

  updateJob(job: JobEntity, username: String){
    return this.httpClient.put(`${this.uri}/${username}`,job);
  }

  deleteJob(job: string){
    return this.httpClient.delete(`${this.uri}/${job}`);
  }


  uploadPhoto(code: String,formData: FormData):  Observable<HttpEvent<{}>>{

    const httpRequest= new HttpRequest('POST',
          `${this.uri}/photo/${code}`,
            formData,
            {reportProgress:true,
              responseType: 'text'});
  
  return   this.httpClient.request(httpRequest);
     
  }

  downLoadPhoto(jobCode: string):Observable<Blob>{

    return this.httpClient.get(`${this.uri}/photo/${jobCode}`,
      {responseType: 'blob'});
     
  }

  private handleError(error: HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
         console.error('ocorreu um erro', error.error.message);
          
      }else{
        console.error('Error do lado da API...codigo do erro: ${error.status, corpo da erro ${error.error}');
      }
      return throwError('Algo inesperado  aconteceu tente mais tarde')

  }
}

