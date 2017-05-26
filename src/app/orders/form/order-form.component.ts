import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { OrdersService } from '../orders.service';
import { SuppliersService } from '../../suppliers/suppliers.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  suppliers;
  order = {
    id: '',
    orderNo: '',
    supplier: {},
    issueDate: '',
    paymentDate: '',
    hasDelivey: false,
    deliveryDate: ''
  };
  orderEdit;

  constructor(private ordersService: OrdersService, private suppliersService: SuppliersService) {
     ordersService.orderEdit$.subscribe(orderEdit => {
        this.orderEdit = orderEdit;
        this.order = this.orderEdit;
      });
   }

  ngOnInit() {
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
     });
  }

  saveOrder() {
    this.ordersService.saveOrder(this.order).subscribe();
    this.clearForm();
  }

  clearForm() {
    this.order = {
      id: '',
      orderNo: '',
      supplier: {},
      issueDate: '',
      paymentDate: '',
      hasDelivey: false,
      deliveryDate: ''
    };
  }

}
