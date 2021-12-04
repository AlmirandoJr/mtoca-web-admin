import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { AccountItemPerItemDto } from '../account-item-per-item-dto';
import { AccountItemService } from '../account-item.service';
import { GroupsPerJobComponent } from '../groups-per-job/groups-per-job.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-numbers-per-item',
  templateUrl: './numbers-per-item.component.html',
  styleUrls: ['./numbers-per-item.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},DatePipe],
})
export class NumbersPerItemComponent implements OnInit, AfterViewInit {


  form = new FormGroup({
  start: new FormControl(),
  end: new FormControl()});

  
  displayedColumns: string[] = ['Musica', 'Preco', 'Obra', 'Nr. vendas','Sub Total'];
  dataSource: MatTableDataSource<AccountItemPerItemDto>;
  accountItemPerItemDtos: AccountItemPerItemDto [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  title :string = 'Numero de Vendas por item';

  total :number =0;

  constructor(private accountItemService: AccountItemService,
    private matDialog:MatDialog,
    private authenticationService: AuthenticationService, 
    private datePipe: DatePipe) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.total = 0;

    if(this.accountItemPerItemDtos != null){

      for(var accountItemPerItemDto of this.accountItemPerItemDtos){

        this.total += accountItemPerItemDto.subTotal;
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }  
  }

  search(){

  
    const startDate = this.form.controls.start.value;
    const endDate = this.form.controls.end.value;

    const startDateFormatted = this.datePipe.transform(startDate, 'dd-MM-yyyy')
    const endDateFormatted = this.datePipe.transform(endDate, 'dd-MM-yyyy')

    if(this.authenticationService.user.profile.name === 'ARTIST'){


      this.accountItemService.getNumberOfAccountItemsPerItembyArtist(
        this.authenticationService.user.username,startDateFormatted,endDateFormatted).subscribe
      (
        success=>{this.accountItemPerItemDtos = success;
          this.dataSource = new MatTableDataSource(this.accountItemPerItemDtos);
        },
        error => {console.error(error);}
    )}else{

    const accountItemPerItemDtosObservable :Observable<AccountItemPerItemDto []> =
        this.accountItemService.getNumberOfAccountItemsPerItem(startDateFormatted,endDateFormatted);

        accountItemPerItemDtosObservable.subscribe( 
          (success: AccountItemPerItemDto[]) =>  {this.accountItemPerItemDtos = success;
            this.dataSource = new MatTableDataSource(this.accountItemPerItemDtos);
          },
          error => {console.error(error)});
    }
      

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    /** Gets the total cost of all transactions. */
  getTotalCost() {
    if(this.accountItemPerItemDtos !== undefined)
      return this.accountItemPerItemDtos.map(t => t.subTotal).reduce((acc, value) => acc + value, 0);
    }
}
