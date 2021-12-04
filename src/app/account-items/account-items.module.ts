import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoughtItemsComponent } from './bought-items/bought-items.component';
import { AccountItemDetaiilsComponent } from './account-item-detaiils/account-item-detaiils.component';
import { PurchasePerArtistComponent } from './purchase-per-artist/purchase-per-artist.component';
import { SearchComponent } from './search/search.component';
import { NumbersPerItemComponent } from './numbers-per-item/numbers-per-item.component';
import { GroupsPerJobComponent } from './groups-per-job/groups-per-job.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [BoughtItemsComponent, AccountItemDetaiilsComponent, PurchasePerArtistComponent, SearchComponent, NumbersPerItemComponent, GroupsPerJobComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class AccountItemsModule { }
