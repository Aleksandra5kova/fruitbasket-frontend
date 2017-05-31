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
      ordersService.cancelChange$.subscribe(order => {
        this.getOrders();
      });
   }

   ngOnInit() {
     this.getOrders();
   }

  // list all orders in the table
  getOrders() {
    this.ordersService.getOrders().subscribe( orders => {
        this.orders = orders;
     });
  }

  // yes button in delete dialog (deletes the order)
  deleteOrder() {
    this.ordersService.deleteOrder(this.selectedOrder.id).subscribe();
    this.cancelButton();
  }

  // delete button in the table (opens dialog)
  deleteButton(selectedOrder) {
    this.showDialog = true;
    this.selectedOrder = selectedOrder;
  }

  // no button in delete dialog (closes the dialog)
  cancelButton() {
    this.showDialog = false;
  }

  // edit button in the table (sends the order to the form)
  editButton(order) {
    this.ordersService.editOrder(order);
  }

}


