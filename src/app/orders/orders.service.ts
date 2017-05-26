import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrdersService {

   private orderFormSource = new Subject<string>();
   private orderDeleteSource = new Subject<string>();
   private orderEditSource = new Subject<string>();

   orderForm$ = this.orderFormSource.asObservable();
   orderDelete$ = this.orderDeleteSource.asObservable();
   orderEdit$ = this.orderEditSource.asObservable();

   baseUrl = '/api';

   constructor(private http: Http) { }

   getOrders(){
     return this.http.get(`${this.baseUrl}/orders`).map((response) => {
        return response.json();
     });
   }

   saveOrder(order) {
      return this.http.post(`${this.baseUrl}/orders`, order).map((response) => {
        this.orderFormSource.next(order);
        return response.json();
      });
   }

   deleteOrder(id) {
     return this.http.delete(`${this.baseUrl}/orders/${id}`).map((response) => {
       this.orderDeleteSource.next(id);
     });
   }

   editOrder(order){
    this.orderEditSource.next(order);
   }

}
