import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class NotificationsService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  sendNotification(notification) {
    return this.http.post(`${this.baseUrl}/producer`, notification).map((response) => { });
  }

  registerConsumer(username) {
    return this.http.post(`${this.baseUrl}/consumer/register/${username}/broadcastqueue/broadcast`, username).map((response) => { });
  }

  getBroadcastNotifications() {
    return this.http.get(`${this.baseUrl}/consumer`).map((response) => {
      return response.json();
    });
  }

  containerStop(username) { 
    return this.http.post(`${this.baseUrl}/consumer/stop/${username}`, username).map((response) => {});
  }

}
