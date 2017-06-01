import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class OrderItemsService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  getOrderItemsByOrder(id){
    let params: URLSearchParams = new URLSearchParams();
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

}
