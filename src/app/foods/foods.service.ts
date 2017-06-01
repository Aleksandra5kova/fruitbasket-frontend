import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class FoodsService {

    baseUrl = '/api';

    constructor(private http: Http) { }

    getFoodsByFoodType(id){
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', id);
      return this.http.get(`${this.baseUrl}/foods/foodtype`, { search: params }).map((response) => {
         return response.json();
      });
    }

    getFoods() {
      return this.http.get(`${this.baseUrl}/foods`).map((response) => {
         return response.json();
      });
    }
}
