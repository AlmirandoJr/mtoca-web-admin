import { Injectable } from '@angular/core';
import { AccountEntity } from './account-entity';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../generic/app.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private accountsUrl = AppConfig.API_URL+'/accounts';



  constructor(private httpClient: HttpClient) { }

  findAllActive() {
    return this.httpClient.get<AccountEntity[]>(`${this.accountsUrl}`);
  }

  updateAccount(account: AccountEntity, amount: number, description: string) {
    return this.httpClient.put(`${this.accountsUrl}/${amount}/${description}`, account)
        .pipe(catchError( e => {throw new Error('occorreu um erro ao  actualizar a conta'); }));
  }

}
