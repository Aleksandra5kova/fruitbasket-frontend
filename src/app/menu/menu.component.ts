import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users/users.service';
import { TranslateService } from '../translate/translate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   user = {
       email: '',
       username: '',
       password: '',
       language: '',
       firstname: '',
       lastname: ''
  };
  error;

  constructor(private usersService: UsersService,
              private router: Router,
              private _translate: TranslateService) { }

  ngOnInit() {
    if (this.isEmpty(this.user.username)) {
      this.setCurrentUser();
    }
  }

  setCurrentUser() {
    this.usersService.getCurrentUser().subscribe(user => {
        this.user = user;
    });
  }

  // logout
  logout() {
      this.error = null;
      this.usersService.logout().subscribe(error => {
        this.error = error;
      });

      if (this.error === null ) {
        this._translate.use('en');
        this.router.navigate(['/users-sign-in']);
      }

      this.user = {
         email: '',
         username: '',
         password: '',
         language: '',
         firstname: '',
         lastname: ''
       };
  }

  isEmpty(object) {
    return object === '';
  }

}
