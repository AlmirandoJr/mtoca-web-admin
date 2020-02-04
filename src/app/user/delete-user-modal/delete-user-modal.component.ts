import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserModalComponent> ,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private userService: UserService,
              private router: Router) {
   }

  ngOnInit() {
  }

  confirm() {
    console.log(this.data);
    this.userService.inactivateUser(this.data)
    .subscribe(x => {this.dialogRef.close();
                     this.router.navigate(['/allusers']);
                     location.reload();

                      },
      e => {console.log(e); });
  }

  dontConfirm() {
    this.dialogRef.close();
  }

}
