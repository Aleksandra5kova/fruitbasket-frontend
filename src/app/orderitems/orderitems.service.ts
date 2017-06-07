import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class OrderItemsService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  getOrderItemsByOrder(id){
    const params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.get(`${this.baseUrl}/orderItems/order`, { search: params }).map((response) => {
      return response.json();
    });
  }

  saveOrderItem(orderItem) {
    return this.http.post(`${this.baseUrl}/orderItems`, orderItem).map((response) => {
      return response.json();
    });
  }

  totalPrice(id){
    const params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.get(`${this.baseUrl}/orderItems/totalPrice`, { search: params }).map((response) => {
      return response.json();
    });
  }

   deleteOrderItem(id) {
     return this.http.delete(`${this.baseUrl}/orderItems/${id}`).map((response) => {
       if (response.status === 200) {
         return true;
       }
     });
   }
}
