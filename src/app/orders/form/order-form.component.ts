import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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
    foodType: {}
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
      foodType: {}
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

  constructor(private ordersService: OrdersService,
              private suppliersService: SuppliersService,
              private foodTypesService: FoodTypesService,
              private foodsService: FoodsService,
              private orderItemsService: OrderItemsService) {
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
        this.getOrderItemsByOrder(this.order.id);
        this.selectedSupplier = this.order.supplier;
      });
   }

  ngOnInit() {
     this.suppliersService.getSuppliers().subscribe( suppliers => {
       this.suppliers = suppliers;
     });
     this.foodTypesService.getFoodTypes().subscribe( foodtypes => {
       this.foodTypes = foodtypes;
     });
     this.foodsService.getFoods().subscribe( foods => {
       this.foods = foods;
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
      this.ordersService.saveOrder(this.order).subscribe((order) => {
        this.order = order;
      });
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
    this.selectedFoodType = {
      id: '',
      name: ''
    };
    this.selectedFood = {
      id: '',
      name: '',
      unit: '',
      price: '',
      foodType: {}
    };
    this.orderitem = {
      id: '',
      quantity: '',
      food: {
        id: '',
        name: '',
        unit: '',
        price: '',
        foodType: {}
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
  }

  // get foods of some foodtype (on change on foodtype dropdown)
  changeFoodType(){
     this.foodsService.getFoodsByFoodType(this.selectedFoodType.id).subscribe( foods => {
       this.foods = foods;
     });
  }

  // get orderitems of some order (on edit button in the table of my orders)
  getOrderItemsByOrder(id){
    this.orderItemsService.getOrderItemsByOrder(id).subscribe(orderitems => {
      this.orderitems = orderitems;
    });
  }

  // save the orderitem (the (+) button)
  saveOrderItem(){

    this.itemErrors = [];
    this.itemErrorsCounter = 0;

    if(this.order.id == ''){
      this.itemErrors[this.itemErrorsCounter++] = 'enterOrder';
    }
    if(this.selectedFood.id == ''){
      this.itemErrors[this.itemErrorsCounter++] = 'itemRequired';
    } else {
      this.orderitem.food = this.selectedFood;
    }
    if(this.orderitem.quantity == ''){
      this.itemErrors[this.itemErrorsCounter++] = 'quantityRequired';
    }

    if(this.itemErrorsCounter == 0) {
      this.orderitem.order.id = this.order.id;
      this.orderItemsService.saveOrderItem(this.orderitem).subscribe(orderItem => {
        this.getOrderItemsByOrder(this.order.id);
        this.clearOrderItem();
      });
    }
  }

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
      foodType: {}
    };
    this.orderitem = {
      id: '',
      quantity: '',
      food: {
        id: '',
        name: '',
        unit: '',
        price: '',
        foodType: {}
      },
      order: {
        id: ''
      }
    };
  }

}
