import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users/users.service';
import { NotificationsService } from '../multicast-notifications/multicast-notifications.service';
import { TranslateService } from '../translate/translate.service';
import { PushNotificationsService } from 'angular2-notifications';

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
       lastname: '',
  };
  error;
  superadmin = 0;
  messages = [];

  constructor(private usersService: UsersService,
              private notificationsService: NotificationsService,
              private router: Router,
              private _translate: TranslateService,
              private _pushNotifications: PushNotificationsService) {

              _pushNotifications.requestPermission();
  }


  ngOnInit() {
    if (this.isEmpty(this.user.username)) {
      this.setCurrentUser();
    }
    this.notify();
  }

  setCurrentUser() {
    this.usersService.getCurrentUser().subscribe(user => {
        this.user = user;
        for ( let i = 0; i < user.roles.length; i++ ) {
          if (user.roles[i].description === 'ROLE_SUPERADMIN') {
            this.superadmin = 1;
          }
        }
    });
  }

  // logout
  logout() {

      this.error = null;
      this.containerStop();

      this.usersService.logout().subscribe(( ) => {
      }, error => {
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

  containerStop() {
    this.notificationsService.containerStop(this.user.username).subscribe(() => { });
  }

  public notify(){ //our function to be called on click
    console.log('notify method');
    this.notificationsService.getBroadcastNotifications().subscribe((result) => {
      if(this.superadmin === 0) {
           this.messages = result;
           console.log(this.messages)
           for( let i = 0; i < this.messages.length; i++) {
           let options = {
              body: this.messages[i],
              timeout: 60
           }

           let notify = this._pushNotifications.create('Information', options).subscribe();
          }
      }
   })
}
}
