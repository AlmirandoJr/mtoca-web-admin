import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AccountEntity } from '../account-entity';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAccountModalComponent } from '../update-account-modal/update-account-modal.component';

@Component({
  selector: 'app-account-get',
  templateUrl: './account-get.component.html',
  styleUrls: ['./account-get.component.css']
})
export class AccountGetComponent implements OnInit {

  title = 'Contas activas';

  accounts: AccountEntity [] = [];
  constructor(private accountService: AccountService,
              private matDiaglog: MatDialog) { }

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

    this.matDiaglog.open(UpdateAccountModalComponent, matDialogConf);

  }

}
