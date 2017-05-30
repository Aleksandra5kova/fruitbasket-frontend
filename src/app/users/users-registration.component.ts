import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    language: 'en'
  };
  passwordConfirmation = '';
  passwordMismatch = false;
  usernameExist = false;
  emailExist = false;
  error = null;
  errorDesc = '';
  languages = [
    { value: 'en', display: 'English' },
    { value: 'mk', display: 'Македонски' }
  ];

  constructor(private router: Router,
              private usersService: UsersService){}

  saveUser() {

      this.checkUsername();
      this.checkEmail();

      if( this.user.password == this.passwordConfirmation){
        this.passwordMismatch = false;
        this.usersService.saveUser(this.user).subscribe(errors => {
          this.errors = errors;
          this.error = false;
          this.errorDesc = '';

          if(!this.usernameExist && !this.emailExist){
              this.router.navigate(['/users-sign-in']);
          }

        }, error => {
          console.log(error);
          if(error.status != 0){
            this.error = true;
            this.errorDesc = 'internalServerError';
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
