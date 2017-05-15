import { Component } from '@angular/core';

import { UsersService } from './users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './users-registration.component.html',
  styleUrls: ['./users-registration.component.css']
})
export class UserRegistrationComponent {

  users;
  errors = {
    fieldName: '',
    defaultMessage: ''
  };
  user = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };
  passwordMismatch = false;

  constructor(private usersService: UsersService){}

  saveUser() {
      
      if( this.user.password == this.user.passwordConfirm ){
        this.passwordMismatch = false;
        this.usersService.saveUser(this.user).subscribe(errors => {
          this.errors = errors;
          console.log(this.errors[0])
        });

      } else {
        this.passwordMismatch = true;
      }

      /*this.user.email = '';
      this.user.username = '';
      this.user.password = '';
      this.user.passwordConfirm = '';*/
    }

}
