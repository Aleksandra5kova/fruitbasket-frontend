import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';

import { OrdersService } from '../orders.service';
import { SuppliersService } from '../../suppliers/suppliers.service';
import { FoodTypesService } from '../../foodtypes/foodtypes.service';
import { FoodsService } from '../../foods/foods.service';
import { OrderItemsService } from '../../orderitems/orderitems.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  showDialog = false;
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
    deliveryDate: '',
    deliveryTime: ''
  };
  orderEdit;
  suppliers = [];
  selectedSupplier = {
      id: '',
      name: '',
      address: '',
      phone: ''
  };
  foodTypes = [];
  selectedFoodType = {
    id: '',
    name: ''
  };
  foods = [];
  selectedFood = {
    id: '',
    name: '',
    unit: '',
    price: '',
    foodType: {
      id: '',
      name: ''
    }
  };
  orderitems = [];
  orderitem = {
    id: '',
    quantity: '',
    food: {
      id: '',
      name: '',
      unit: '',
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    },
    order: {
      id: ''
    }
  };
  deliveryFlag = false;
  errors = [];
  errorsCounter = 0;
  itemErrors = [];
  itemErrorsCounter = 0;
  currentQuantity = '';
  total = 0;
  selectedOrderItem = {
    id: '',
    quantity: '',
    food: {
      id: '',
      name: '',
      unit: '',
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    },
    order: {
      id: ''
    }
  };

  constructor(private ordersService: OrdersService,
              private suppliersService: SuppliersService,
              private foodTypesService: FoodTypesService,
              private foodsService: FoodsService,
              private orderItemsService: OrderItemsService) {
      // edit order
      ordersService.orderEdit$.subscribe(orderEdit => {
        this.clearForm();
        this.orderEdit = orderEdit;
        if(this.orderEdit.hasDelivey == true) {
          this.deliveryFlag = true;
        } else {
          this.deliveryFlag = false;
        }
        this.order = this.orderEdit;

        this.getOrderItemsByOrder(this.order.id);
        this.selectedSupplier = this.order.supplier;
        this.getTotalPrice();
      });
   }

  ngOnInit() {
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
     });
     this.foodTypesService.getFoodTypes().subscribe( foodtypes => {
       this.foodTypes = foodtypes;
     });
     this.getFoods();
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

    var datePipe = new DatePipe('en-US');
    this.order.issueDate = datePipe.transform(this.order.issueDate, 'yyyy-MM-dd');
    this.order.paymentDate = datePipe.transform(this.order.paymentDate, 'yyyy-MM-dd');
    this.order.deliveryDate = datePipe.transform(this.order.deliveryDate, 'yyyy-MM-dd');
    console.log(this.order.deliveryTime);

    if(this.errorsCounter == 0) {
      if(this.deliveryFlag == true) {
        this.order.hasDelivey = '1';
      } else {
        this.order.hasDelivey = '0';
        this.order.deliveryDate = null;
        this.order.deliveryTime = null;
      }
      this.order.supplier = this.selectedSupplier;
      this.ordersService.saveOrder(this.order).subscribe((order) => {
        this.order = order;
      });
    }

  }

  /**
   * Clear the form.
   */
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
      deliveryDate: '',
      deliveryTime: ''
    };
    this.deliveryFlag = false;
    this.selectedSupplier = {
      id: '',
      name: '',
      address: '',
      phone: ''
    };
    this.selectedFoodType = {
      id: '',
      name: ''
    };
    this.selectedFood = {
      id: '',
      name: '',
      unit: '',
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    };
    this.orderitem = {
      id: '',
      quantity: '',
      food: {
        id: '',
        name: '',
        unit: '',
        price: '',
        foodType: {
          id: '',
          name: ''
        }
      },
      order: {
        id: ''
      }
    };
    this.orderitems = [];
    this.errors = [];
    this.errorsCounter = 0;
    this.itemErrors = [];
    this.itemErrorsCounter = 0;
    this.ordersService.cancelChange(this.order);
    this.currentQuantity = '';
  }

  // get foods of some foodtype (on change on foodtype dropdown)
  changeFoodType(){
     this.getFoodsByFoodType();
  }

  // get orderitems of some order (on edit button in the table of my orders)
  getOrderItemsByOrder(id){
    this.orderItemsService.getOrderItemsByOrder(id).subscribe(orderitems => {
      this.orderitems = orderitems;
    });
  }

  isEmpty(object){
   return object === '';
  }
  // save the orderitem (the (+) button)
  saveOrderItem(){

    console.log(this.selectedFood);

    this.itemErrors = [];
    this.itemErrorsCounter = 0;

    if(this.isEmpty(this.order.id)){
      this.itemErrors[this.itemErrorsCounter++] = 'enterOrder';
    }
    if(this.selectedFood.id == ''){
      this.itemErrors[this.itemErrorsCounter++] = 'itemRequired';
    } else {
      this.orderitem.food = this.selectedFood;
    }
    if(this.currentQuantity == ''){
      this.itemErrors[this.itemErrorsCounter++] = 'quantityRequired';
    } else {
      this.orderitem.quantity = this.currentQuantity;
    }

    if(this.itemErrorsCounter == 0) {
      this.orderitem.order.id = this.order.id;
      this.orderItemsService.saveOrderItem(this.orderitem).subscribe(orderItem => {
        this.getOrderItemsByOrder(this.order.id);
        this.clearOrderItem();
        this.getTotalPrice();
      });
    }
  }

  // clear the orderitem form
  clearOrderItem(){
    this.selectedFoodType = {
      id: '',
      name: ''
    };
    this.selectedFood = {
      id: '',
      name: '',
      unit: '',
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    };
    this.orderitem = {
      id: '',
      quantity: '',
      food: {
        id: '',
        name: '',
        unit: '',
        price: '',
        foodType: {
          id: '',
          name: ''
        }
      },
      order: {
        id: ''
      }
    };
    this.currentQuantity = '';
  }

  // edit orderitem
  editOrderItem(orderitem) {

    // delete all errors before editing new orderitem
    this.errorsCounter = 0;
    this.itemErrors = [];

    this.orderitem = orderitem;
    this.selectedFoodType = orderitem.food.foodType;
    this.getFoodsByFoodType();
    this.selectedFood = orderitem.food;
    this.currentQuantity = orderitem.quantity;
  }

  // get all the foods
  getFoods(){
    this.foodsService.getFoods().subscribe( foods => {
       this.foods = foods;
    });
  }

  // get all the foods from selected foodtype
  getFoodsByFoodType(){
    this.foodsService.getFoodsByFoodType(this.selectedFoodType.id).subscribe( foods => {
         this.foods = foods;
    });
  }

  getTotalPrice(){
    this.orderItemsService.totalPrice(this.order.id).subscribe( total => {
         this.total = total;
    });
  }

  // delete button in the orderitems table (opens dialog)
  deleteButton(selectedOrderItem){
    this.showDialog = true;
    this.selectedOrderItem = selectedOrderItem;
  }

  // yes button in the dialog
  deleteOrderItem(){
    this.orderItemsService.deleteOrderItem(this.selectedOrderItem.id).subscribe(status => {
      if(status){
        this.getOrderItemsByOrder(this.order.id);
        this.getTotalPrice();
        this.cancelButton();
      }
    });
  }

  // no button in the dialog
  cancelButton(){
    this.showDialog = false;
  }

  onRowClick(event, orderitem, field) {

    if(field == 'orderitem.quantity') {
      if(!isNaN(Number(event.target.outerText))) {
        orderitem.quantity = event.target.outerText;
      }
    }

    this.orderItemsService.saveOrderItem(orderitem).subscribe(orderItem => {
        this.getOrderItemsByOrder(this.order.id);
        this.clearOrderItem();
        this.getTotalPrice();
    });

  }

}
