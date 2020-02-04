import { Component, OnInit, Input } from '@angular/core';
import { UserEntity } from '../user.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ProfileEntity } from '../profile.entity';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: UserEntity;
  profile: ProfileEntity;
  profiles: ProfileEntity [];
  passNotMatching = false;
  createSucessfulCreated = false;

  form = new FormGroup({username: new FormControl(''),
    fullName: new FormControl(''),
    password1: new  FormControl(''),
    password2: new  FormControl('')
   // profileControlName: new FormControl('')
  });


  title = 'Novo Utilizador';

  constructor(private profileService: ProfileService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.profileService.getProfiles()
      .subscribe((p: ProfileEntity[]) => {
        this.profiles = p;
      });
  }

  onSubmit() {

    this.checkPasswordFields(this.form.value.password1, this.form.value.password2);

    this.user = {
      id: null,
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updatedBy: null,
      active: null,
      username: this.form.value.username,
      password: this.form.value.password1,
      fullName: this.form.value.fullName
    };

    // this.profile = this.form.controls.profileControlName.value;
    // console.log(this.form.controls['profileControlName'].value);

    this.userService.createUser(this.user)
        .subscribe(resp => console.log('user saved sucessfuly', resp),
            err => console.error('Error', err));

    this.form.reset();
    this.createSucessfulCreated = true;

  }

  private checkPasswordFields(pass1: string, pass2: string) {
    if (  pass1 !== pass2 ) {
      this.passNotMatching =  true;
      return;

    } else {
    this.passNotMatching =  false;

    }
  }



}
