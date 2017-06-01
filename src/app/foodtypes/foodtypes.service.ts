import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FoodTypesService {

    baseUrl = '/api';

    constructor(private http: Http) { }

    getFoodTypes(){
      return this.http.get(`${this.baseUrl}/foodTypes`).map((response) => {
          return response.json();
      });
    }

}
