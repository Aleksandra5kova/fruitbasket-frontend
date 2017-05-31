import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  isLoggedIn() {
    return this.http.get(`${this.baseUrl}/isLoggedIn`).map((response) => {
      return response.json();
    });
  }

}
