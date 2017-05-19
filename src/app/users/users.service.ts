import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  baseUrl = '/api';

  constructor(private http: Http){}

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`).map((response) => {
      return response.json();
    });
  }

   saveUser(user) {
       return this.http.post(`${this.baseUrl}/users`, user ).map((response) => {
          return response.json();
        });
        /*.catch(error) => {
        };*/
    }

    checkUsername(username){
      return this.http.post(`${this.baseUrl}/checkUsername`, username).map((response) => {
          return response.json();
      });
    }

    checkEmail(email){
      return this.http.post(`${this.baseUrl}/checkEmail`, email).map((response) => {
          return response.json();
      });
    }

    loginUser1(username, password){

       const creds = 'username=' + username + '&password=' + password;

       const headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       headers.append('Authorization', 'Basic' + btoa(username + ':' + password));

      return this.http.post(`${this.baseUrl}/authenticate`, creds, { headers : headers } ).map((response) => {
        console.log('post auth respose' + response);
        return response.json();
      });

    }
}

