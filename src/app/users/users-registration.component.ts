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
    password: ''
  };
  passwordConfirmation = '';
  passwordMismatch = false;
  usernameExist = false;
  emailExist = false;
  error = null;
  errorDesc = '';

  constructor(private usersService: UsersService){}

  saveUser() {

      if( this.user.password == this.passwordConfirmation ){
        this.passwordMismatch = false;
        this.usersService.saveUser(this.user).subscribe(errors => {
          this.errors = errors;
          this.error = false;
          this.errorDesc = '';

        }, error => {
          console.log(error);

          if(error.status != 0){
            this.error = true;
            this.errorDesc = 'Internal server error.';            
          }

        });

      } else {
        this.passwordMismatch = true;
      }

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
