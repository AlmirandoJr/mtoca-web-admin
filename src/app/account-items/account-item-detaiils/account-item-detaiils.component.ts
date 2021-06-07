import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AccountItemEntity } from '../account-item-entity';
import { AccountItemService } from '../account-item.service';
import { MpesaC2BResponseEntity } from '../mpesa-c2b-response-entity';

@Component({
  selector: 'app-account-item-detaiils',
  templateUrl: './account-item-detaiils.component.html',
  styleUrls: ['./account-item-detaiils.component.css']
})
export class AccountItemDetaiilsComponent implements OnInit {

  title :string  = 'Detalhes da compra: '+this.accountItem.code;
  mpesaC2BResponseEntities: MpesaC2BResponseEntity[];

  constructor(public dialogRef:MatDialogRef<AccountItemDetaiilsComponent>,
    private accountItemService: AccountItemService,
    @Inject (MAT_DIALOG_DATA) public accountItem: AccountItemEntity,
    ) { }

  ngOnInit(): void {
    const mpesaC2BResponsesObservable: Observable<MpesaC2BResponseEntity[]> =
      this.accountItemService.getMpesaTriesByAccountItemCode(this.accountItem.code);

      mpesaC2BResponsesObservable.subscribe(
        success => {this.mpesaC2BResponseEntities = success},
        error => {console.log(error)}
      );
  }

}
