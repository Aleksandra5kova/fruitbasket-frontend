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
        this.usersService.loginUser1(this.user.username, this.user.password).subscribe(user => {
            this.user = user;
        });

    }
}
