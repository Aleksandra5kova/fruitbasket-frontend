import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class OrdersService {

   baseUrl = '/api';

   constructor(private http: Http) { }

   getOrders(){
     return this.http.get(`${this.baseUrl}/orders`).map((response) => {
        return response.json();
     });
   }
     
   saveOrder(order){
      return this.http.post(`${this.baseUrl}/orders`, order).map((response) => {
        
        return response.json();
      });
   }
   

}
