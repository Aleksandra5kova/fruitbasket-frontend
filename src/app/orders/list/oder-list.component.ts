import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order.list.component.css']
})
export class OrderListComponent implements OnInit {

  errors;
  selectedOrder;
  showDialog = false;
  orders;
  order = {
    id: '',
    orderNo: '',
    supplier: {},
    issueDate: '',
    paymentDate: '',
    hasDelivey: false,
    deliveryDate: ''
  };

   constructor(private ordersService: OrdersService) {
      ordersService.orderForm$.subscribe( order => {
        this.getOrders();
      });
      ordersService.orderDelete$.subscribe(id => {
        this.getOrders();
      });
   }

   ngOnInit() {
     this.getOrders();
   }

  getOrders() {
    this.ordersService.getOrders().subscribe( orders => {
        this.orders = orders;
     });
  }

  deleteOrder() {
    this.ordersService.deleteOrder(this.selectedOrder.id).subscribe();
    this.cancelButton();
  }

  deleteButton(selectedOrder) {
    this.showDialog = true;
    this.selectedOrder = selectedOrder;
  }

  cancelButton() {
    this.showDialog = false;
  }

  editButton(order){
    this.ordersService.editOrder(order);
  }

}


