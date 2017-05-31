import { Component, OnInit } from '@angular/core';

import { TranslateService } from './translate/translate.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    currentUser = {
      email: '',
      username: '',
      password: '',
      language: 'en'
    };

    constructor(private _translate: TranslateService,
                private usersService: UsersService) { }

    ngOnInit( ) {
          //if the user refreshes the page
          this.usersService.getCurrentUser().subscribe(currentUser => {
              this.currentUser = currentUser;
              this._translate.use(this.currentUser.language);
          });
    }
}
