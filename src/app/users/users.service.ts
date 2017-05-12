import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  baseUrl = 'http://localhost:8080';

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
    }

}
