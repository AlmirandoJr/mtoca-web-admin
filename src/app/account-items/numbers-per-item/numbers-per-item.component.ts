import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { AccountItemPerItemDto } from '../account-item-per-item-dto';
import { AccountItemService } from '../account-item.service';
import { GroupsPerJobComponent } from '../groups-per-job/groups-per-job.component';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-numbers-per-item',
  templateUrl: './numbers-per-item.component.html',
  styleUrls: ['./numbers-per-item.component.css']
})
export class NumbersPerItemComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Musica', 'Preco', 'Obra', 'Nr. vendas','SubTotal'];
  dataSource: MatTableDataSource<AccountItemPerItemDto>;
  accountItemPerItemDtos: AccountItemPerItemDto [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  title :string = 'Numero de Vendas por item';

  total :number =0;

  constructor(private accountItemService: AccountItemService,
    private matDialog:MatDialog,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    if(this.authenticationService.user.profile.name === 'ARTIST'){
      this.accountItemService.getNumberOfAccountItemsPerItembyArtist(
        this.authenticationService.user.username).subscribe
      (
        success=>{this.accountItemPerItemDtos = success;
          this.dataSource = new MatTableDataSource(success);
        },
        error => {console.error(error);}
    )}else{
    
    const accountItemPerItemDtosObservable :Observable<AccountItemPerItemDto []> =
         this.accountItemService.getNumberOfAccountItemsPerItem();

         accountItemPerItemDtosObservable.subscribe( 
           (success: AccountItemPerItemDto[]) =>  {this.accountItemPerItemDtos = success;
            this.dataSource = new MatTableDataSource(success);
          },
           error => {console.error(error)});
         }

         this.dataSource = new MatTableDataSource(this.accountItemPerItemDtos);


  }

  ngAfterViewInit(): void {

    this.total = 0;

    for(var accountItemPerItemDto of this.accountItemPerItemDtos){

      this.total += accountItemPerItemDto.subTotal;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
