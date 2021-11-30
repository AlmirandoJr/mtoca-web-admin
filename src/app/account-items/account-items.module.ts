import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoughtItemsComponent } from './bought-items/bought-items.component';
import { AccountItemDetaiilsComponent } from './account-item-detaiils/account-item-detaiils.component';
import { PurchasePerArtistComponent } from './purchase-per-artist/purchase-per-artist.component';
import { SearchComponent } from './search/search.component';
import { NumbersPerItemComponent } from './numbers-per-item/numbers-per-item.component';
import { GroupsPerJobComponent } from './groups-per-job/groups-per-job.component';
import {  MatPaginatorModule, MatTableModule, MatTabsModule } from '@angular/material';



@NgModule({
  declarations: [BoughtItemsComponent, AccountItemDetaiilsComponent, PurchasePerArtistComponent, SearchComponent, NumbersPerItemComponent, GroupsPerJobComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AccountItemsModule { }
