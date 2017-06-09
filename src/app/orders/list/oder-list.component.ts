import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../orders.service';
import { SuppliersService } from '../../suppliers/suppliers.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order.list.component.css']
})
export class OrderListComponent implements OnInit {

  errors;
  selectedOrder;
  showDialog = false;
  showDialog1 = false;
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
  suppliers = [];
  selectedSupplier = {
      id: '',
      name: '',
      address: '',
      phone: ''
  };
  errorsCounter = 0;
  errors1;
  editableCoulumn: '';
  editableRow: '';

   constructor(private ordersService: OrdersService,
               private suppliersService: SuppliersService) {
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
     this.getSuppliers();
   }

   saveOrder(order) {

    this.errors1 = [];
    this.errorsCounter = 0;

    this.validateOrder(order);
    this.showDialog1 = true;

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
    if (order.deliveryDate === null || this.isEmpty(order.deliveryDate)) {
      this.errors1[this.errorsCounter++] = 'deliveryDateRequired';
    } else {
      if (order.deliveryDate != null && !this.isEmpty(order.deliveryDate)) {
        if (this.isDateInvalid(order.deliveryDate) || this.isDatePast(order.deliveryDate)) {
          this.errors1[this.errorsCounter++] = 'deliveryDateInvalid';
        }
        if (this.compareDates(order.issueDate, order.deliveryDate)) {
          this.errors1[this.errorsCounter++] = 'deliveryNotAllowed';
        }
      }
    }
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

  // list all suppliers in appropriate dropdown
  getSuppliers() {
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
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

  // ok in errors dialog
  refreshList() {
    this.getOrders();
    this.showDialog1 = false;
  }

  focusOut(){
     this.editableCoulumn = '';
     this.editableRow = '';
     const elements =  (<HTMLScriptElement[]><any>document.getElementsByClassName('text-span'));
     for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline';
     }
  }

  focusIn(i,j){
     this.editableCoulumn = i;
     this.editableRow = j;
  } 

}


