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
    deliveryDate: '',
    deliveryTime: ''
  };
   errorsCounter = 0;
   errors1;

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

   saveOrder(order) {

    this.errors1 = [];
    this.errorsCounter = 0;

    this.validateOrder(order);

    console.log(this.errorsCounter);
    console.log(this.errors1);

    if (this.errorsCounter === 0) {
      this.ordersService.saveOrder(order).subscribe((order) => {
        this.order = order;
      });
    }

  }

  // validation before saving order
  validateOrder(order){
    if (this.isEmpty(order.orderNo)) {
      this.errors1[this.errorsCounter++] = 'orderNoRequired';
    }
    if (this.isEmpty(order.issueDate)) {
      this.errors1[this.errorsCounter++] = 'issueDateRequired';
    }
    if (this.isEmpty(order.paymentDate)) {
      this.errors1[this.errorsCounter++] = 'paymentDateRequired';
    }
    /*if (this.order.deliveryDate === null || this.isEmpty(this.order.deliveryDate)) {
      this.errors1[this.errorsCounter++] = 'deliveryDateRequired';
    } else {
      if(this.order.deliveryDate != null && !this.isEmpty(this.order.deliveryDate)){
        if (this.isDateInvalid(this.order.deliveryDate) || this.isDatePast(this.order.deliveryDate)) {
          this.errors1[this.errorsCounter++] = 'deliveryDateInvalid';
        }
        if (this.compareDates(this.order.issueDate, this.order.deliveryDate)) {
          this.errors1[this.errorsCounter++] = 'deliveryNotAllowed';
        }
      }
    }*/
    if (this.isDateInvalid(order.issueDate) || this.isDatePast(order.issueDate)) {
      this.errors1[this.errorsCounter++] = 'issueDateInvalid';
    }
    if (this.isDateInvalid(order.paymentDate) || this.isDatePast(order.paymentDate)) {
      this.errors1[this.errorsCounter++] = 'paymentDateInvalid';
    }
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

  onRowClickOrder(event, order, field) {

    if (this.isEqual(field, 'order.orderNo')) {
      order.orderNo = event.target.outerText;
    }
    if (this.isEqual(field, 'order.issueDate')) {
      order.issueDate = event.target.outerText;
    }
    if (this.isEqual(field, 'order.paymentDate')) {
      order.paymentDate = event.target.outerText;
    }
    if (this.isEqual(field, 'order.deliveryDate')) {
      order.deliveryDate = event.target.outerText;
    }

    this.ordersService.saveOrder(order).subscribe( order => {
        this.order = order;
    });

  }

  isEqual(field, value) {
    return field === value;
  }

  isEmpty(object) {
    return object === '';
  }

  isDateInvalid(date){
    return !/^\d{4}\-\d{2}\-\d{2}$/.test(date);
  }

  isDatePast(date) {
    const parts = date.split('-');
    const inputDate = new Date(parts[0], parts[1]-1, parts[2]);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return inputDate < today;
  }

  compareDates(date1, date2){
    const parts1 = date1.split('-');
    const inputDate1 = new Date(parts1[0], parts1[1]-1, parts1[2]);
    const parts2 = date2.split('-');
    const inputDate2 = new Date(parts2[0], parts2[1]-1, parts2[2]);
    return inputDate1 > inputDate2;
  }

}


