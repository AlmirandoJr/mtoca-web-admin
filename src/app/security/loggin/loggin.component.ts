import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

import { UserEntity } from 'src/app/user/user.entity';


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  uiError = false;
  uiErrorMessage = 'Login falhou';
  userEntity: UserEntity = null;
  form = new  FormGroup({username: new FormControl(''),
                         password: new FormControl('')});

  constructor(private authentication: AuthenticationService,
              private router: Router) {   }

  ngOnInit() {
  }

  login() {

    this.authentication.login(this.form.value.username,
      this.form.value.password)
      .subscribe(data => {
                 this.uiError  = false;
                 this.router.navigate(['/allusers']);
        },
        e => { this.handleError(e);
               this.uiError  = true;
               this.form.reset();
           });

  }
  private clearFields() {
    this.form.setValue({
      username: '',
      password: ''
    });
  }

  private  handleError(error: HttpErrorResponse ) {
    if ( error instanceof ErrorEvent) {
      console.error('ocorreu um ErrorEvent: ' + error.status);
      console.error('mensagem do ErrorEvent: ' + error.message);
      console.error('corpo do ErrorEvent: ' + error.error);

    } else if( error.status === 401 ) {

      this.uiErrorMessage = ' username e/ou password incorrectas';
      console.error('ocorreu um ErrorEvent: ' + error.status);
      console.error('mensagem do ErrorEvent: ' + error.message);
      console.error('corpo do ErrorEvent: ' + error.error);

    } else {
      this.uiErrorMessage = ' erro inesperado ocorreu ';

      console.error('error: ' + error.status);
      console.error('mensagem do erro: ' + error.message);
      console.error('corpo do erro: ' + error.error);
    }
    // console.log('Erro inesperado ' + error.message);

  }

}






