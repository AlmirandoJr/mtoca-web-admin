import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserEntity } from 'src/app/user/user.entity';


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  uiError = false;
  uiErrorMessage = 'Login falhou';

  form = new  FormGroup({username: new FormControl(''),
                         password: new FormControl('')});

  constructor(private authentication: AuthenticationService,
              private router: Router) {   }

  ngOnInit() {
  }

  login() {
    console.log(this.form.value.username);
    console.log(this.form.value.password);
    this.uiError  = false;

    if
    (this.authentication.login(this.form.value.username,
      this.form.value.password)) {
         console.log(this.uiError);
         this.router.navigate(['/allusers']);

      } else {
        this.uiError  = true;
        this.form.reset();

      }


  }
  private clearFields() {
    this.form.setValue({
      username: '',
      password: ''
    });
  }
}







