import { Component, OnInit } from '@angular/core';
import { UserEntity} from '../user.entity';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';


@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  title = 'Utilizadores Cadastrados';

  users: UserEntity[];


  constructor(private userService: UserService,
              private router: Router,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.userService.getActiveUsers()
          .subscribe( (u: UserEntity[]) => {
      this.users = u; },
        error => { console.log( error.message );
      });
  }

  redirectToUpdate( user: string ) {
    this.router.navigate(['/updateUser'], {queryParams: {username: user}});
  }


  openDeleteModel(username) {
    const  matDialogConf = new  MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.height = '350px';
    matDialogConf.width = '600px';
    matDialogConf.data = username;
    matDialogConf.id = 'deleteuser:' + username;

    this.matDialog.open(DeleteUserModalComponent, matDialogConf);
  }
}
