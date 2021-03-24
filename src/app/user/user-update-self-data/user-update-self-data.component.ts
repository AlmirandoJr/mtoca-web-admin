import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update-self-data',
  templateUrl: './user-update-self-data.component.html',
  styleUrls: ['./user-update-self-data.component.css']
})
export class UserUpdateSelfDataComponent implements OnInit {

  success:boolean = false; 
  sucessMessage:string = 'Dados do utilizador actualizados com sucesso'
  failture:boolean = false;
  failtureMessage: string = 'erro inesperadoa ao actualizar os dados do Utilizador';

  title :string = 'Actualizacao dos dados utilizador';


  form = this.formBuilder.group({
    usernameField : this.user.username,
    name :  this.user.name,
    city :  this.user.city,
    gender :  this.user.gender,
    birthDate : this.user.birthDate
  });

  constructor(dialogRef: MatDialogRef<UserUpdateSelfDataComponent>,
    private formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public user: UserEntity,
    private userSerive: UserService) { }

  ngOnInit(): void {
    
  }

  updateUser(){

    this.user.name = this.form.controls.name.value;
    this.user.city = this.form.controls.city.value;
    this.user.gender = this.form.controls.gender.value;
    this.user.birthDate = this.form.controls.birthDate.value;
    
    this.userSerive
      .updateUserByHimSelf(this.user)
        .subscribe(
          sucess=>{
            this.success =true; 
            this.failture =false;
          },
          error =>{
            this.success =false; 
            this.failture =true;
          }
        );
  }

}
