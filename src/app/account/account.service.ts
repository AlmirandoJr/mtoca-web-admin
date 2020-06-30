import { Injectable } from '@angular/core';
import { AccountEntity } from './account-entity';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private findAllActiveUrl = 'http://localhost:9090/accounts';


  private updateAccountUrl = 'http://localhost:9090/accounts';

  constructor(private httpClient: HttpClient) { }

  findAllActive() {
    return this.httpClient.get<AccountEntity[]>(`${this.findAllActiveUrl}`);
  }

  updateAccount(account: AccountEntity, amount: number, description: string) {
    return this.httpClient.put(`${this.updateAccountUrl}/${amount}/${description}`, account)
        .pipe(catchError( e => {throw new Error('occorreu um erro ao  actualizar a conta'); }));
  }

}
