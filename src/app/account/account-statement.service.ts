import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AccountStatementEntity } from './AccountStatementEntity';
import { AppConfig } from '../generic/app.config';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementService {


  accountStatementUrl  = AppConfig.API_URL+'/accountstatements';
  constructor(private httpCleint: HttpClient) { }

  findAccountStatementByUsername(username: string){
    return this.httpCleint.get<AccountStatementEntity []>(`${this.accountStatementUrl}/${username}`)
        .pipe(map(x => { return x; }),
              catchError( e => {throw new  Error('account statement error' + e.message); }));
  }
}
