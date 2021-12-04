import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../generic/app.config';
import { AccountItemEntity } from './account-item-entity';
import { AccountItemPerItemDto } from './account-item-per-item-dto';
import { GroupsPerJobDTO } from './group-per-job-dto';
import { MpesaC2BResponseEntity } from './mpesa-c2b-response-entity';

@Injectable({
  providedIn: 'root'
})
export class AccountItemService {

  constructor(private httpClient: HttpClient) {}

   accountItemsURI = AppConfig.API_URL+'/account-items';


   getAllAccountItems(){
     return this.httpClient.get<AccountItemEntity[]>(`${this.accountItemsURI}/bought-items-all`)
   }

   getAccountItemsByCustomerUsername(username: string){
    return this.httpClient.get(`${this.accountItemsURI}/bought-items-per-customer/${username}`)
   }

   getAccountItemsByArtistUsername(username: string){
    return this.httpClient.get<AccountItemEntity[]>(`${this.accountItemsURI}/bought-items-per-artist/${username}`)
   }

   getMpesaTriesByAccountItemCode(code: string){
    return this.httpClient.get<MpesaC2BResponseEntity[]>(`${this.accountItemsURI}/mpesa-tries/${code}`)
   }

   getNumberOfAccountItemsPerItem(start, end){
     return this.httpClient.get<AccountItemPerItemDto[]>(`${this.accountItemsURI}/account-per-item?startDate=${start}&endDate=${end}`)
   }

   getNumberOGroupPerJob( start, end){
    return this.httpClient.get<GroupsPerJobDTO[]>(`${this.accountItemsURI}/group-per-job?startDate=${start}&endDate=${end}`)
  }

  getNumberOfAccountItemsPerItembyArtist(username: string, start, end){
    return this.httpClient.get<AccountItemPerItemDto[]>(`${this.accountItemsURI}/account-per-item-by-artist/${username}?startDate=${start}&endDate=${end}`)
  }

  getNumberOGroupPerJobByArtist(username: string,  start, end){
   return this.httpClient.get<GroupsPerJobDTO[]>(`${this.accountItemsURI}/group-per-job-by-artist/${username}?startDate=${start}&endDate=${end}`)
 }



}
