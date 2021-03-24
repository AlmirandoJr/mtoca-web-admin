import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProfileEntity } from '../profile.entity';
import { UserEntity } from '../user.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGetComponent } from '../user-get/user-get.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  profile: ProfileEntity =  this.data.profile;
  success: boolean = false;
  failture: boolean = false;
  sucessMessage: string = 'Utilizador actualizado com sucesso';
  failtureFailture: string = 'Erro ao actualizar utilizador';
  title :string = 'Actualizar  utilizador';

  profiles: ProfileEntity [] = [];
  userMtoca: UserEntity = null;
  form = this.formBuilder.group({
    username: this.data.username,
    name:   this.data.name,
    city: this.data.city,
    gender: this.data.gender,
    birthDate: this.data.birthDate,
    profile: this.data.profile.name

  });

  constructor( 
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserEntity,
    private userService: UserService,
    private profileService: ProfileService,
    private  formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(`>>>>>>>>>>>>>${this.data.profile.name}`);

      this.userMtoca =  this.data;

    this.profileService.getProfiles().subscribe(data => { this.profiles = data; },
      e => {console.error(e); } ); 

  }

  updateUser() {

    this.userMtoca.username = this.form.controls.username.value;
    this.userMtoca.name = this.form.controls.name.value;
    this.userMtoca.birthDate = this.form.controls.birthDate.value;
    this.userMtoca.city =  this.form.controls.city.value;
    this.userMtoca.gender = this.form.controls.gender.value;

    const selectedProfileName :string = this.form.controls.profile.value;

 

    this.userService.updateUser(this.userMtoca,selectedProfileName)
      .subscribe(x => {  this.success = true;
                         this.failture = false;
                        this.form.reset(); },
                 e => { console.error(e.message);
                        this.failture = true; });
  }

}
