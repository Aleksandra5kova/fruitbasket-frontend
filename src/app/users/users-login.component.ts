import { Component } from '@angular/core';

import { UsersService } from './users.service';

@Component({
    selector: 'app-user-signin',
    templateUrl: './users-login.component.html',
    styleUrls: ['./users-login.component.css']
})
export class UsersSignInComponent {

    user = {
        username: '',
        password: ''
    };
    error = null;
    errorDesc = '';

    constructor(private usersService: UsersService){}

    loginUser() {
        this.usersService.loginUser(this.user.username, this.user.password).subscribe(user => {
            this.user = user;
        }, error => {
            console.log(error);
            if(error.status == 0){
                this.error = false;
                this.errorDesc = '';
            } else if(error.status == 500){
                this.error = true;
                this.errorDesc = 'Incorrect username or password.';
            } else {
                this.error = true;
                this.errorDesc = 'Internal server error.';
            } 
        });

    }
}
