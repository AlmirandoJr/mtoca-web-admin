import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountStatementEntity } from '../AccountStatementEntity';
import { AccountStatementService } from '../account-statement.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  accountStatements: AccountStatementEntity [] = [];

  constructor(public dialogRef: MatDialogRef<AccountStatementComponent>,
              @Inject (MAT_DIALOG_DATA) public data: string,
              private accountStatementService: AccountStatementService) { }

  ngOnInit() {
    this.accountStatementService.findAccountStatementByUsername(this.data)
      .subscribe((x: AccountStatementEntity []) => {this.accountStatements = x; },
        e => {console.error(e.message); });

  }

}
