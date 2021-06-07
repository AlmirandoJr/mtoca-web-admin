import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AccountItemDetaiilsComponent } from '../account-item-detaiils/account-item-detaiils.component';
import { AccountItemEntity } from '../account-item-entity';
import { AccountItemService } from '../account-item.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-bought-items',
  templateUrl: './bought-items.component.html',
  styleUrls: ['./bought-items.component.css']
})
export class BoughtItemsComponent implements OnInit {

  constructor(private accountItemService: AccountItemService ,
    private matDialog:MatDialog) { }

  accountItems: AccountItemEntity []= [];

  title: string = "Lista de Items comprados"

  ngOnInit(): void {
    const ObservableOfAccountItems: Observable<AccountItemEntity[]> = this.accountItemService.getAllAccountItems();
    
    ObservableOfAccountItems.subscribe
    (
      success=>{this.accountItems = success;},
      error => {console.error(error);}
    )
  }

  search(){
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '350px';
    matDialogConfig.width = '700px';
    matDialogConfig.id= 'search';

    this.matDialog.open(SearchComponent, matDialogConfig);



  }

  
  

  openDetails(accountitem: AccountItemEntity){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '700px';
    matDialogConfig.width = '1200px';
    matDialogConfig.id= 'accountitem-details';
    matDialogConfig.data = accountitem;

    this.matDialog.open(AccountItemDetaiilsComponent, matDialogConfig);

  }

}
