import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {

  baseUrl = '/api';

  constructor(private http: Http){}

  // list users
  getUsers() {
    return this.http.get(`${this.baseUrl}/users`).map((response) => {
      return response.json();
    });
  }

  // create user
   saveUser(user) {
       return this.http.post(`${this.baseUrl}/register`, user ).map((response) => {
          return response.json();
        }).catch((error) => {
          throw error;
        });
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

    getCurrentUser() {
      return this.http.get(`${this.baseUrl}/currentUser`).map((response) => {
        if(response["_body"] === "") {
          return  {
            email: '',
            username: '',
            password: '',
            language: 'en'
          };
        }
          return response.json();
      });
    }

    loginUser(username, password){

       const creds = 'username=' + username + '&password=' + password;

       const headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       headers.append('Authorization', 'Basic' + btoa(username + ':' + password));

      return this.http.post(`${this.baseUrl}/authenticate`, creds, { headers : headers } ).map((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
    }

    logout() {
      return this.http.get(`${this.baseUrl}/logout`).map((response) => {
         return {
            email: '',
            username: '',
            password: '',
            language: 'en'
          };
      }).catch((error) => {
        throw error;
      });
    }

    

}


