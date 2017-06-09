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
    hasDelivey: 0,
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
    price: '',
    foodType: {
      id: '',
      name: ''
    }
  };
  orderitems = [];
  orderitem = {
    id: '',
    quantity: 0,
    unit: '',
    price: '',
    food: {
      id: '',
      name: '',
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
  currentQuantity = 0;
  total = 0;
  selectedOrderItem = {
    id: '',
    quantity: 0,
    unit: '',
    price: '',
    food: {
      id: '',
      name: '',
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
  selectedUnit = { name: '', rate: 1 };
  units = [ { name: 'kg', rate: 1 },
            { name: 'g', rate: 0.001}];

  constructor(private ordersService: OrdersService,
              private suppliersService: SuppliersService,
              private foodTypesService: FoodTypesService,
              private foodsService: FoodsService,
              private orderItemsService: OrderItemsService) {
      // edit order
      ordersService.orderEdit$.subscribe(orderEdit => {
        this.clearForm();
        this.orderEdit = orderEdit;
        if (this.orderEdit.hasDelivey === 1) {
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

    this.validateOrder();

    if (this.errorsCounter === 0) {
      if (this.deliveryFlag === true) {
        this.order.hasDelivey = 1;
      } else {
        this.order.hasDelivey = 0;
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
      hasDelivey: 0,
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
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    };
    this.orderitem = {
      id: '',
      quantity: 0,
      unit: '',
      price: '',
      food: {
        id: '',
        name: '',
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
    this.currentQuantity = 0;
    this.selectedUnit = { name: '', rate: 1 };
  }

  // get foods of some foodtype (on change on foodtype dropdown)
  changeFoodType() {
     this.getFoodsByFoodType();
  }

  // get orderitems of some order (on edit button in the table of my orders)
  getOrderItemsByOrder(id) {
    this.orderItemsService.getOrderItemsByOrder(id).subscribe(orderitems => {
      this.orderitems = orderitems;
    });
  }

  // save the orderitem (the (+) button)
  saveOrderItem() {

    this.itemErrors = [];
    this.itemErrorsCounter = 0;

    this.validateOrderItem();

    if (this.itemErrorsCounter === 0) {
      this.orderitem.order.id = this.order.id;

      // add additional quantity to existing orderitem
      for ( let i = 0; i < this.orderitems.length; i++) {
        if( this.orderitem.food.id == this.orderitems[i].food.id && this.isEmpty(this.orderitem.id)) {
          this.orderitems[i].quantity += this.orderitem.quantity;
          this.orderitem = this.orderitems[i];
        }
      }

      this.orderItemsService.saveOrderItem(this.orderitem).subscribe(orderItem => {
        this.getOrderItemsByOrder(this.order.id);
        this.clearOrderItem();
        this.getTotalPrice();
      });
    }
  }

   // edit orderitem
  editOrderItem(orderitem) {

    // delete all errors before editing new orderitem
    this.itemErrors = [];
    this.itemErrorsCounter = 0;

    this.orderitem = orderitem;
    this.selectedFoodType = orderitem.food.foodType;
    this.getFoodsByFoodType();
    this.selectedFood = orderitem.food;
    this.currentQuantity = orderitem.quantity;

    // select default unit when editing orderitem
    this.selectedUnit.name = this.units[0].name;
    this.selectedUnit.rate = this.units[0].rate;

  }

  // clear the orderitem form
  clearOrderItem() {
    this.selectedFoodType = {
      id: '',
      name: ''
    };
    this.selectedFood = {
      id: '',
      name: '',
      price: '',
      foodType: {
        id: '',
        name: ''
      }
    };
    this.orderitem = {
      id: '',
      quantity: 0,
      unit: '',
      price: '',
      food: {
        id: '',
        name: '',
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
    this.currentQuantity = 0;
    this.selectedUnit = { name: '', rate: 1 };
  }

  // get all the foods
  getFoods() {
    this.foodsService.getFoods().subscribe( foods => {
       this.foods = foods;
    });
  }

  // get all the foods from selected foodtype
  getFoodsByFoodType() {
    this.foodsService.getFoodsByFoodType(this.selectedFoodType.id).subscribe( foods => {
         this.foods = foods;
    });
  }

  getTotalPrice() {
    this.orderItemsService.totalPrice(this.order.id).subscribe( total => {
         this.total = total;
    });
  }

  // delete button in the orderitems table (opens dialog)
  deleteButton(selectedOrderItem) {
    this.showDialog = true;
    this.selectedOrderItem = selectedOrderItem;
  }

  // yes button in the dialog
  deleteOrderItem() {
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

  //changes in the order table that must be saved on back-end
  onRowClick(event, orderitem, field) {
    if (this.isEqual(field, 'orderitem.quantity')) {
      if (!isNaN(Number(event.target.outerText))) {
        orderitem.quantity = event.target.outerText;
      }
    }

    this.orderItemsService.saveOrderItem(orderitem).subscribe(orderItem => {
        this.getOrderItemsByOrder(this.order.id);
        this.clearOrderItem();
        this.getTotalPrice();
    });
  }

  isEmpty(object) {
    return object === '';
  }

  isEqual(field, value) {
    return field === value;
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

  // change the unit rate when change event happens on select
  changeUnitRate(){
    for ( let i = 0; i < this.units.length; i++ ) {
        if (this.units[i].name == this.selectedUnit.name) {
          this.selectedUnit.rate = this.units[i].rate;
        }
    }
  }

  // validation before saving order
  validateOrder(){
    if (this.isEmpty(this.order.orderNo)) {
      this.errors[this.errorsCounter++] = 'orderNoRequired';
    }
    if (this.isEmpty(this.selectedSupplier.id)) {
      this.errors[this.errorsCounter++] = 'supplierRequired';
    }
    if (this.isEmpty(this.order.issueDate)) {
      this.errors[this.errorsCounter++] = 'issueDateRequired';
    }
    if (this.isEmpty(this.order.paymentDate)) {
      this.errors[this.errorsCounter++] = 'paymentDateRequired';
    }
    if (this.deliveryFlag === true && ( this.order.deliveryDate === null || this.isEmpty(this.order.deliveryDate))) {
      this.errors[this.errorsCounter++] = 'deliveryDateRequired';
    } else {
      if(this.order.deliveryDate != null && !this.isEmpty(this.order.deliveryDate)){
        if (this.isDateInvalid(this.order.deliveryDate) || this.isDatePast(this.order.deliveryDate)) {
          this.errors[this.errorsCounter++] = 'deliveryDateInvalid';
        }
        if (this.compareDates(this.order.issueDate, this.order.deliveryDate)) {
          this.errors[this.errorsCounter++] = 'deliveryNotAllowed';
        }
      }
    }
    if (this.isDateInvalid(this.order.issueDate) || this.isDatePast(this.order.issueDate)) {
      this.errors[this.errorsCounter++] = 'issueDateInvalid';
    }
    if (this.isDateInvalid(this.order.paymentDate) || this.isDatePast(this.order.paymentDate)) {
      this.errors[this.errorsCounter++] = 'paymentDateInvalid';
    }
  }

  // validation before saving orderitem
  validateOrderItem(){
    if (this.isEmpty(this.order.id)) {
      this.itemErrors[this.itemErrorsCounter++] = 'enterOrder';
    }
    if (this.isEmpty(this.selectedFood.id)) {
      this.itemErrors[this.itemErrorsCounter++] = 'itemRequired';
    } else {
      this.orderitem.food = this.selectedFood;
    }
    if (this.currentQuantity < 1 || this.currentQuantity > 1000) {
      this.itemErrors[this.itemErrorsCounter++] = 'quantityInvalid';
    } else {
      this.orderitem.quantity = this.currentQuantity;
    }
    if (this.isEmpty(this.selectedUnit.name)) {
      this.itemErrors[this.itemErrorsCounter++] = 'unitRequired';
    } else {
      // calculate the orderitem's quantity
      this.orderitem.quantity *= this.selectedUnit.rate;
    }
  }

}
