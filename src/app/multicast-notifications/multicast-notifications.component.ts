import { Component } from '@angular/core';

import { NotificationsService } from './multicast-notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './multicast-notifications.component.html',
  styleUrls: ['./multicast-notifications.component.css']
})
export class NotificationComponent {

  notifications = [];
  notification = {
    type: 'broadcast',
    message: ''
  };

  constructor(private notificationsService: NotificationsService) {

  }

  sendNotification() {
    this.notificationsService.sendNotification(this.notification).subscribe( notification => { });
  }

  clearForm() {
    this.notification = {
      type: 'broadcast',
      message: ''
    };
  }

}
