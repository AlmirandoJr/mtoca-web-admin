import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProfileEntity } from '../profile.entity';
import { UserEntity } from '../user.entity';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  profile: ProfileEntity = null;
  success = false;
  sucessMessage = 'Utilizador actualizado com sucesso';
  profiles: ProfileEntity [] = [];
  usernameQueryStringParam: string = null;
  userMtoca: UserEntity = null;
  form = this.formBuilder.group({
    username: [''],
    fullName:   [''],
    profile: ['']
  });



  constructor(private userService: UserService, private profileService: ProfileService,
              private  formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // retrive param from query string
    this.activatedRoute.queryParams
        .subscribe(x => {this.usernameQueryStringParam = x.username; });

    // get the username and set the fecthed user to the form
    this.userService.findUserByUSername(this.usernameQueryStringParam)
      .subscribe(x => { this.userMtoca = x;
                        this.form.setValue ({username: this.userMtoca.username,
                                             fullName: this.userMtoca.fullName,
                                             profile: null}); },
               e => {console.error(e.message); } ) ;


    this.profileService.getProfiles().subscribe(data => { this.profiles = data; },
      e => {console.error(e); } );
  }

  updateUser() {

    this.userMtoca.username = this.form.controls.username.value;
    this.userMtoca.fullName = this.form.controls.fullName.value;
    const  profileC: ProfileEntity = this.form.get('profile').value;

    this.userService.updateUser(this.userMtoca, profileC)
      .subscribe(x => { this.success = true;
                        this.form.reset(); },
                 e => { console.error(e.message); });
  }

}
