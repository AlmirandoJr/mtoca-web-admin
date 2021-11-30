import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/user/user.entity';
import { AuthenticationService } from '../authentication.service';
import { ValidadeOtpComponent } from '../validade-otp/validade-otp.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, 
    private authenticationService: AuthenticationService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  uiError = false;
  uiErrorMessage = 'Erro um ocorreu ao redefinir a senha';
  isSucessfulReset = false;
  SucessfulResetMessage = 'OTP code enviado sucesso';
  username: string = null;

  form = new  FormGroup({username: new FormControl('')});
  logo = '../../assets/logo.png';

  requestResetPassword(){
    
    //request password reset and send OTP code 
    this.authenticationService
    .requestResetPassword(this.form.controls.username.value)
      .subscribe(success => {this.isSucessfulReset = true;
                             this.uiError = false;
                            this.form.reset(); },
        error => {this.isSucessfulReset = false;
          this.uiError = true});

    // open up the form for OTP validation
    const  matDialogConf = new  MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.height = '450px';
    matDialogConf.width = '800px';
    matDialogConf.data = this.form.controls.username.value;
    matDialogConf.id = 'validadeOTP:' + this.form.controls.username.value;

    alert(matDialogConf.data);

    const dialog = this.matDialog.open(ValidadeOtpComponent, matDialogConf);
    dialog.afterClosed().subscribe(x=>{ this.ngOnInit()});
  }
  back(){
    this.router.navigate(['/login']);
  }

}
