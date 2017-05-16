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

    constructor(private usersService: UsersService){}

    loginUser() {
        console.log(this.user.username);
        this.usersService.loginUser(this.user).subscribe(user => {
            this.user = user;
        });
    }
}