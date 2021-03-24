import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../user/change-password/change-password.component';
import { UserUpdateSelfDataComponent } from '../user/user-update-self-data/user-update-self-data.component';
import { UserUpdateSelfPhotoComponent } from '../user/user-update-self-photo/user-update-self-photo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
              private router: Router,
              private matDialog:MatDialog) {

   }

   logo = '../assets/logo.png'


  ngOnInit() {
   
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changePassword(){

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.height = '600px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'changePassword';
    matDialogConfig.data = this.authenticationService.username;

   const dialog = this.matDialog.open(ChangePasswordComponent,matDialogConfig);
    dialog.afterClosed().subscribe(x => {this.ngOnInit()});

  }

  updateUserData(){
    const matDialogConfig  = new  MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '600px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'update-user-data-by-him-self';
    matDialogConfig.data = this.authenticationService.user;

    const dialog = this.matDialog.open(UserUpdateSelfDataComponent,matDialogConfig);
    dialog.afterClosed().subscribe(x => {this.ngOnInit()});



  }

  setProfilePhoto(){
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = false;
    matDialogConfig.height = '600px';
    matDialogConfig.width = '800px';
    matDialogConfig.id = 'update-user-photo-by-him-self';
    matDialogConfig.data = this.authenticationService.user;

    const dialog = this.matDialog.open(UserUpdateSelfPhotoComponent,matDialogConfig);
    dialog.afterClosed().subscribe(x => {this.ngOnInit()});
  }
}
