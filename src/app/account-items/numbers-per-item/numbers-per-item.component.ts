import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { AccountItemPerItemDto } from '../account-item-per-item-dto';
import { AccountItemService } from '../account-item.service';
import { GroupsPerJobComponent } from '../groups-per-job/groups-per-job.component';

@Component({
  selector: 'app-numbers-per-item',
  templateUrl: './numbers-per-item.component.html',
  styleUrls: ['./numbers-per-item.component.css']
})
export class NumbersPerItemComponent implements OnInit {


  accountItemPerItemDtos: AccountItemPerItemDto [];

  title :string = 'Numero de Vendas por item';

  constructor(private accountItemService: AccountItemService,
    private matDialog:MatDialog,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    if(this.authenticationService.user.profile.name === 'ARTIST'){
      this.accountItemService.getNumberOfAccountItemsPerItembyArtist(
        this.authenticationService.user.username).subscribe
      (
        success=>{this.accountItemPerItemDtos = success;},
        error => {console.error(error);}
    )}else{
    
    const accountItemPerItemDtosObservable :Observable<AccountItemPerItemDto []> =
         this.accountItemService.getNumberOfAccountItemsPerItem();

         accountItemPerItemDtosObservable.subscribe( 
           (success: AccountItemPerItemDto[]) =>  {this.accountItemPerItemDtos = success},
           error => {console.error(error)});
         }
  }

  openGroupPerJob(){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '800px';
    matDialogConfig.width = '1000px';
    matDialogConfig.id = 'newGroupPerJob';

   const dialog = this.matDialog.open(GroupsPerJobComponent,matDialogConfig);
    dialog.afterClosed().subscribe(x => {this.ngOnInit()});

  }

}
