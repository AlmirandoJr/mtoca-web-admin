import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-validade-otp',
  templateUrl: './validade-otp.component.html',
  styleUrls: ['./validade-otp.component.css']
})
export class ValidadeOtpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidadeOtpComponent>,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

    uiError = false;
    uiErrorMessage = 'OTP code invalido';
    isSucessfulReset = false;
    SucessfulResetMessage = 'Redefinicao de senha efectuada com sucesso';

    username: string = null;
    otp: string = null;

    form = new  FormGroup({
      username: new FormControl({
         value: this.data,
         disable: true 
      }),
      otp: new FormControl('')
    });

  ngOnInit(): void {
  }

  resetPassword(){

    this.authenticationService
    .resetPassword(this.form.controls.username.value,this.form.controls.otp.value)
      .subscribe(success => {this.isSucessfulReset = true;
                             this.uiError = false;
                            this.form.reset(); },
        error => {this.isSucessfulReset = false;
          this.uiError = true});

  }

  close(){
    
  
  }

}
