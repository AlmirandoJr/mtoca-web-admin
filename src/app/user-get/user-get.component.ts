import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  users: any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((data: UserModel) => {
      this.users = data;
    });
  }

}
