import { Component } from '@angular/core';

import { UsersService } from './users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './users-registration.component.html',
  styleUrls: ['./users-registration.component.css']
})
export class UserRegistrationComponent {

  errors = null;
  users;
  user = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };
  passwordMismatch = false;
  usernameExist = false;
  emailExist = false;

  constructor(private usersService: UsersService){}

  saveUser() {
      
      if( this.user.password == this.user.passwordConfirm ){
        this.passwordMismatch = false;
        this.usersService.saveUser(this.user).subscribe(errors => {
          this.errors = errors;
        });

      } else {
        this.passwordMismatch = true;
      }

      /*this.user.email = '';
      this.user.username = '';
      this.user.password = '';
      this.user.passwordConfirm = '';*/
    }

    checkUsername() {
       this.usersService.checkUsername(this.user.username).subscribe(usernameExist => {
         this.usernameExist = usernameExist;
       });
    }

    checkEmail() {
       this.usersService.checkEmail(this.user.email).subscribe(emailExist => {
         this.emailExist = emailExist;
       });
    }

}
