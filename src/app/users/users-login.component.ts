import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from './users.service';
import { TranslateService } from '../translate/translate.service';

@Component({
    selector: 'app-user-signin',
    templateUrl: './users-login.component.html',
    styleUrls: ['./users-login.component.css']
})
export class UsersSignInComponent {

    user = {
       email: '',
       username: '',
       password: '',
       language: ''
    };
    error = null;
    errorDesc = '';

    constructor(private router: Router,
                private usersService: UsersService,
                private _translate: TranslateService) { }

    // login
    loginUser() {
        this.usersService.loginUser(this.user.username, this.user.password).subscribe(user => {},
        error => {
            console.log(error);
            if(error.status == 0) {
                this.error = false;
                this.errorDesc = '';
                this.setCurrentLanguage();
                this.router.navigate(['/welcome']);
            } else if(error.status == 500) {
                this.error = true;
                this.errorDesc = 'incorrectUsernameOrPassword';
            } else {
                this.error = true;
                this.errorDesc = 'internalServerError';
            }
        });
    }

    // set user's language
    setCurrentLanguage() {
        this.usersService.getCurrentUser().subscribe(user => {
             this.user.language = user.language;
             this._translate.use(this.user.language);
        });
    }

}
