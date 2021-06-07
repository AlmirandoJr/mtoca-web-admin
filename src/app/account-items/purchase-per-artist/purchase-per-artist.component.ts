import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { AccountItemDetaiilsComponent } from '../account-item-detaiils/account-item-detaiils.component';
import { AccountItemEntity } from '../account-item-entity';
import { AccountItemService } from '../account-item.service';

@Component({
  selector: 'app-purchase-per-artist',
  templateUrl: './purchase-per-artist.component.html',
  styleUrls: ['./purchase-per-artist.component.css']
})
export class PurchasePerArtistComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<PurchasePerArtistComponent>,
    private accountItemService: AccountItemService,
    @Inject (MAT_DIALOG_DATA) public username: string,
    private matDialog:MatDialog,
    private authenticationService: AuthenticationService) { }

  title: string = ' Compras do artista: '+this.username;

  accountItems: AccountItemEntity []= [];


  ngOnInit(): void {

    if(this.authenticationService.user.profile.name === 'ARTIST'){
      this.accountItemService.getAccountItemsByArtistUsername(this.username).subscribe
      (
        success=>{this.accountItems = success;},
        error => {console.error(error);}
    );


    }else{
      this.accountItemService.getAccountItemsByArtistUsername(this.username).subscribe
      (
        success=>{this.accountItems = success;},
        error => {console.error(error);}
    );


    }

  }

  openDetails(accountitem: AccountItemEntity){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.height = '700px';
    matDialogConfig.width = '1200px';
    matDialogConfig.id= 'accountitem-details1';
    matDialogConfig.data = accountitem;

    this.matDialog.open(AccountItemDetaiilsComponent, matDialogConfig);

  }
}