import { Component, OnInit } from '@angular/core';
import { UserEntity} from '../user.entity';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  title = 'Utilizadores Cadastrados';

  users: UserEntity[];


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getActiveUsers()
          .subscribe( (u: UserEntity[]) => {
      this.users = u; },
        error => { console.log( error.message );
      });
  }
}
