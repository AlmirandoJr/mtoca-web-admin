import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  success: boolean = false;
  failture: boolean = false;
  sucessMessage: string = 'Utilizador removido com sucesso';
  failtureFailture: string = 'Erro ao remover utilizador';

  constructor(public dialogRef: MatDialogRef<DeleteUserModalComponent> ,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private userService: UserService) {
   }

  ngOnInit() {
  }

  confirm(event) {
    
    this.userService.inactivateUser(this.data)
    .subscribe(x => { event.target.disabled= true;
                      this.success=true;
                      this.failture=false},
                (e: HttpErrorResponse) => {this.failture=true;
                this.success=false;
                this.failtureFailture = e.error.message+""; });
  }

  dontConfirm() {
    this.dialogRef.close();
  }

}
