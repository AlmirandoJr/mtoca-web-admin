import { Component, OnInit } from '@angular/core';
import { UserEntity} from '../user.entity';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserUpdateComponent } from '../user-update/user-update.component';


@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  title = 'Utilizadores Cadastrados';
  sucessfulCreation= false;
  sucessfulCreationMessage= 'Utilizador criado com sucesso';
  sucessfulUpdate = false;
  sucessfulUpdateMessage = 'Utilizador actualizado com sucesso';;




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

  /**redirectToUpdate( user: string ) {
    this.router.navigate(['/updateUser'], {queryParams: {username: user}});
  }*/


  openDeleteModel(username) {
    const  matDialogConf = new  MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.height = '350px';
    matDialogConf.width = '600px';
    matDialogConf.data = username;
    matDialogConf.id = 'deleteuser:' + username;

    const dialog = this.matDialog.open(DeleteUserModalComponent, matDialogConf);
    dialog.afterClosed().subscribe(x=>{ this.ngOnInit()});
  }

  openCreateUser(){
    const matDialogConf = new  MatDialogConfig();
    matDialogConf.disableClose = false;
    matDialogConf.height = '550px';
    matDialogConf.width = '800px';
    matDialogConf.id = 'createuser';

    const  dialog = this.matDialog.open(UserAddComponent, matDialogConf);
    dialog.afterClosed().subscribe(x=>{ this.ngOnInit()});


  }

  openUpdateUser(user: UserEntity){
    const matDialogConf = new  MatDialogConfig();
    matDialogConf.disableClose = false;
    matDialogConf.height = '550px';
    matDialogConf.width = '800px';
    matDialogConf.id = 'UpdateUser';
    matDialogConf.data = user;

   const dialog=  this.matDialog.open(UserUpdateComponent, matDialogConf);

    dialog.afterClosed().subscribe(x=>{ this.ngOnInit()});

  }
}
