import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { OrdersService } from './orders.service';
import { SuppliersService } from '../suppliers/suppliers.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  suppliers;
  orders;
  order = {
    orderNo: '',
    supplier: {},
    issueDate: '',
    paymentDate: '',
    hasDelivey: false,
    deliveryDate: ''
  };

  constructor(private ordersService: OrdersService, private suppliersService: SuppliersService) { }

  ngOnInit() {
     this.getOrders();
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
     });
  }

  getOrders(){
    this.ordersService.getOrders().subscribe( orders => {
        this.orders = orders;
     });
  }

  saveOrder(){
    this.ordersService.saveOrder(this.order).subscribe(order => {
      this.orders.push(order); 
    });
    this.clearForm();
  }

  clearForm(){
    this.order = {
      orderNo: '',
      supplier: {},
      issueDate: '',
      paymentDate: '',
      hasDelivey: false,
      deliveryDate: ''
    };
  }

}
