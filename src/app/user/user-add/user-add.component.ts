import { Component, OnInit, Input } from '@angular/core';
import { UserEntity } from '../user.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ProfileEntity } from '../profile.entity';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: UserEntity;
  profile: ProfileEntity;
  profiles: ProfileEntity [];
  

  success: boolean = false;
  failture: boolean = false;
  displayBio: boolean = false;
  passNotMatching: boolean = false;
  sucessMessage: string = 'Utilizador criado com sucesso';
  failtureFailture: string = 'Erro ao criar utilizador';
  

  form = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    password1: new  FormControl(''),
    password2: new  FormControl(''),
    profileName: new FormControl(''),
    city:   new FormControl(''),
    gender: new FormControl(''),
    birthDate: new FormControl(''),
    bio:  new FormControl('')
  });


  title = 'Novo Utilizador';

  constructor(public dialogRef: MatDialogRef<UserAddComponent> ,
              private profileService: ProfileService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.profileService.getProfiles()
      .subscribe((p: ProfileEntity[]) => {
        this.profiles = p;
      });
  }

  onSubmit() {

    const  pass  =
        this.checkPasswordFields(
            this.form.value.password1,
            this.form.value.password2);

    this.user = {
      id: null,
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updatedBy: null,
      active: null,
      username: this.form.value.username,
      password: pass,
      name: this.form.value.name,
      city: this.form.value.city,
      gender: this.form.value.gender,
      birthDate: this.form.value.birthDate,
      profile: new ProfileEntity(),
      bio: this.form.controls.bio.value
    };

     this.profile = this.form.controls.profileName.value;
    
    this.userService.createUser(this.user,this.profile.name)
        .subscribe(resp => {this.success=true;
          this.failture=false;
          this.form.reset();}
          ,
            (err:HttpErrorResponse) => { this.failture=true,
              this.success=false;
              this.failtureFailture= err.error.message+"";
                });

   

  }

  private checkPasswordFields(pass1: string, pass2: string) {
    if (  pass1 !== pass2 ) {
      this.passNotMatching = true;

      return null;
    }
    this.passNotMatching = false;
    return pass1;

  }

  onSelectProfile(event){
    let profile: ProfileEntity = event;

    if(profile.name === 'ARTIST'){
      this.displayBio = true;
    }else{
      this.displayBio = false;
    }
  }



}
