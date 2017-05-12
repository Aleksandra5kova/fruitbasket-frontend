import { Component } from '@angular/core';

import { UsersService } from './users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './users-registration.component.html',
  styleUrls: ['./users-registration.component.css']
})
export class UserRegistrationComponent {

  users;
  user = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  constructor(private usersService: UsersService){}

  saveUser() {
      this.usersService.saveUser(this.user).subscribe(user => {
        this.users.push(user);
      });
      /*this.user.email = '';
      this.user.username = '';
      this.user.password = '';
      this.user.passwordConfirm = '';*/
    }

}
