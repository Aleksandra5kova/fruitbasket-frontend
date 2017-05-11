import { Component } from '@angular/core';

import { UsersService } from './users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './users-registration.component.html'
})
export class UserRegistrationComponent {

  users;
  user = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };

  constructor(private usersService: UsersService) {}

  saveUser() {
      this.usersService.saveUser(this.user).subscribe(user => {
        this.users.push(user);
      });
      this.user.firstname = '';
      this.user.lastname = '';
      this.user.username = '';
      this.user.password = '';
    }
    
}
