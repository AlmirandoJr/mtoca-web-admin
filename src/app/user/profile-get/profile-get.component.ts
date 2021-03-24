import { Component, OnInit } from '@angular/core';
import { ProfileEntity } from '../profile.entity';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-get',
  templateUrl: './profile-get.component.html',
  styleUrls: ['./profile-get.component.css']
})
export class ProfileGetComponent implements OnInit {

  title = 'Perfis do Utilizador';

  profiles: ProfileEntity [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfiles()
      .subscribe((p: ProfileEntity[]) => {this.profiles = p;
    });
  }

}
