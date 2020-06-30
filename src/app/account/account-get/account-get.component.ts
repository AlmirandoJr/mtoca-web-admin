import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AccountEntity } from '../account-entity';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAccountModalComponent } from '../update-account-modal/update-account-modal.component';
import { AccountStatementService } from '../account-statement.service';
import { AccountStatementEntity } from '../AccountStatementEntity';
import { AccountStatementComponent } from '../account-statement/account-statement.component';

@Component({
  selector: 'app-account-get',
  templateUrl: './account-get.component.html',
  styleUrls: ['./account-get.component.css']
})
export class AccountGetComponent implements OnInit {

  title = 'Contas activas';

  accounts: AccountEntity [] = [];
  constructor(private accountService: AccountService,
              private matDiaglog: MatDialog,
              private accountStatementService: AccountStatementService) { }

  ngOnInit() {
    this.accountService.findAllActive()
      .subscribe( x => { this.accounts = x; },
        e => { console.error(e.message); });
  }

  openUpdateModal(accountId: number) {

    const matDialogConf = new MatDialogConfig();
    matDialogConf.width = '600px';
    matDialogConf.height = '500px';
    matDialogConf.data = accountId;
    matDialogConf.id = accountId + 'account';
    matDialogConf.disableClose = true;

    const dialog = this.matDiaglog.open(UpdateAccountModalComponent, matDialogConf);
    dialog.afterClosed().subscribe(x=>{this.ngOnInit();})

  }

  showAccountStatement(username: string) {


    this.accountStatementService.findAccountStatementByUsername(username);
    const matDiaglogConf = new MatDialogConfig();
    matDiaglogConf.width = '800px';
    matDiaglogConf.height = '700px';
    matDiaglogConf.id = 'accountStatements';
    matDiaglogConf.data = username;

    this.matDiaglog.open(AccountStatementComponent, matDiaglogConf);

  }

}
