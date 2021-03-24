import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/user/user.entity';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  uiError = false;
  uiErrorMessage = 'Erro um ocorreu ao redefinir a senha';
  isSucessfulReset = false;
  SucessfulResetMessage = 'Senha redefinida com sucesso';
  username: string = null;
  form = new  FormGroup({username: new FormControl('')});
  logo = '../../assets/logo.png';

  resetPassword(){
    
    this.authenticationService
    .resetPassword(this.form.controls.username.value)
      .subscribe(success => {this.isSucessfulReset = true;
                             this.uiError = false;
                            this.form.reset(); },
        error => {this.isSucessfulReset = false;
          this.uiError = true});
  }
  back(){
    this.router.navigate(['/login']);
  }

}
