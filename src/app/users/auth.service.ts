import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  isLoggedIn() {
    return this.http.get(`${this.baseUrl}/isLoggedIn`).map((response) => {
      console.log('auth service');
      return response.json();
    });
  }

}
