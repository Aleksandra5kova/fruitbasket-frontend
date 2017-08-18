import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users/users.service';
import { NotificationsService } from '../multicast-notifications/multicast-notifications.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    user = {
      email: '',
      username: '',
      password: '',
      language: '',
      firstname: '',
      lastname: '',
    };
    superadmin = 0;
    messages = [];

    constructor(private usersService: UsersService, private notificationsService: NotificationsService) { }

    ngOnInit() {
      this.usersService.getCurrentUser().subscribe(user => {
        this.user = user;
        for ( let i = 0; i < user.roles.length; i++ ) {
          if (user.roles[i].description === 'ROLE_SUPERADMIN') {
            this.superadmin = 1;
          }
        }
        if (this.superadmin === 0) {
         this.registerConsumer();
        }
      });
    }

    getBroadcastNotifications() {
      this.notificationsService.getBroadcastNotifications().subscribe(messages => {
        this.messages = messages;
        console.log(messages);
      });
    }

    registerConsumer() {
      this.notificationsService.registerConsumer(this.user.username).subscribe(username => { });
    }
}
