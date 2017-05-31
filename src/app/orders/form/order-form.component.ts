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

  suppliers = [];
  selectedSupplier = {
      id: '',
      name: '',
      address: '',
      phone: ''
  };
  order = {
    id: '',
    orderNo: '',
    supplier: {
      id: '',
      name: '',
      address: '',
      phone: ''
    },
    issueDate: '',
    paymentDate: '',
    hasDelivey: '',
    deliveryDate: ''
  };
  orderEdit;
  deliveryFlag = false;
  errors = [];
  errorsCounter = 0;

  constructor(private ordersService: OrdersService, private suppliersService: SuppliersService) {
      // edit order
      ordersService.orderEdit$.subscribe(orderEdit => {
        this.clearForm();
        this.orderEdit = orderEdit;
        if(this.orderEdit.hasDelivey == 'YES') {
          this.deliveryFlag = true;
        } else {
          this.deliveryFlag = false;
        }
        this.order = this.orderEdit;
        this.selectedSupplier = this.order.supplier;
      });
   }

  ngOnInit() {
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
     });
  }

  // validate and save order
  saveOrder() {

    this.errors = [];
    this.errorsCounter = 0;

    if(this.order.orderNo == ''){
      this.errors[this.errorsCounter++] = 'orderNoRequired';
    }
    if(this.selectedSupplier.id == ''){
      this.errors[this.errorsCounter++] = 'supplierRequired';
    }
    if(this.order.issueDate == ''){
      this.errors[this.errorsCounter++] = 'issueDateRequired';
    }
    if(this.order.paymentDate == ''){
      this.errors[this.errorsCounter++] = 'paymentDateRequired';
    }
    if(this.deliveryFlag == true && ( this.order.deliveryDate == null || this.order.deliveryDate == '')) {
      this.errors[this.errorsCounter++] = 'deliveryDateRequired';
    }

    if(this.errorsCounter == 0) {
      if(this.deliveryFlag == true){
        this.order.hasDelivey = 'YES';
      } else {
        this.order.hasDelivey = 'NO';
        this.order.deliveryDate = null;
      }
      this.order.supplier = this.selectedSupplier;
      this.ordersService.saveOrder(this.order).subscribe();
      this.clearForm();
    }

  }

  // clear the form
  clearForm() {
    this.order = {
      id: '',
      orderNo: '',
      supplier: {
        id: '',
        name: '',
        address: '',
        phone: ''
      },
      issueDate: '',
      paymentDate: '',
      hasDelivey: '',
      deliveryDate: ''
    };
    this.deliveryFlag = false;
    this.selectedSupplier = {
      id: '',
      name: '',
      address: '',
      phone: ''
    };
    this.errors = [];
    this.errorsCounter = 0;
    this.ordersService.cancelChange(this.order);
  }

}
