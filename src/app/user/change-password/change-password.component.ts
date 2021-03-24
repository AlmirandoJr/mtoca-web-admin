import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public username: string,
    private userSerive: UserService) { }

  ngOnInit(): void {
  }
  uiErrorMessage: string = '';
  missMatchPasswords: boolean =false;
  theSamePassErrorMessage = 'As novas senhas devem ser iguais'
  errorUpdatingPassword: boolean =false;
  errorUpdatingPasswordMessage = 'Erro ocorreu ao aterar a senha, certifique que a senha antiga esta correcta!'
  successPasswordChanged: boolean =false;
  successPasswordChangedMessage = 'A senha foi alterada com sucesso'



  form = this.formBuilder.group({
    oldPassword: [''],
    newPassword1: [''],
    newPassword2: ['']
  });


  change(){

    if(this.form.controls.newPassword1.value !== this.form.controls.newPassword2.value){
      this.missMatchPasswords = true;
      return;
    }

    const oldPass: string = this.form.controls.oldPassword.value;
    const newPass: string = this.form.controls.newPassword1.value;

    this.userSerive.changePassword(this.username,oldPass,newPass)
      .subscribe(
        sucess=>{
          this.missMatchPasswords =false;
          this.errorUpdatingPassword = false;
          this.successPasswordChanged  =true;
          this.form.reset();
        },
        error=>{
          this.missMatchPasswords =false;
          this.errorUpdatingPassword = true;
          this.successPasswordChanged  =false;
        });

  }
  close(){
    this.dialogRef.close();
  }

}
