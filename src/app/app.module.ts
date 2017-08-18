import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FocusModule } from 'angular2-focus';
import { PushNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
import { UsersSignInComponent } from './users/users-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/list/oder-list.component';
import { OrderFormComponent } from './orders/form/order-form.component';
import { MenuComponent } from './menu/menu.component';
import { DeleteDialogComponent } from './orders/delete-dialog/delete-dialog.component';
import { ErrorsDialogComponent } from './orders/errors-dialog/errors-dialog.component';
import { NotificationComponent } from './multicast-notifications/multicast-notifications.component';

import { UsersService } from './users/users.service';
import { AuthService } from './users/auth.service';
import { OrdersService } from './orders/orders.service';
import { CanActivateViaAuthGuard } from './users/auth-guard.service';
import { SuppliersService } from './suppliers/suppliers.service';
import { FoodTypesService } from './foodtypes/foodtypes.service';
import { FoodsService } from './foods/foods.service';
import { OrderItemsService } from './orderitems/orderitems.service';
import { TRANSLATION_PROVIDERS } from './translate/translations';
import { TranslateService } from './translate/translate.service';
import { NotificationsService } from './multicast-notifications/multicast-notifications.service';
import { TranslatePipe } from './translate/translate.pipe';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserRegistrationComponent,
    UsersSignInComponent,
    WelcomeComponent,
    OrdersComponent,
    OrderListComponent,
    OrderFormComponent,
    MenuComponent,
    DeleteDialogComponent,
    ErrorsDialogComponent,
    NotificationComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    FocusModule,
    PushNotificationsModule,
    routing
  ],
  providers: [
    UsersService,
    AuthService,
    OrdersService,
    SuppliersService,
    FoodTypesService,
    FoodsService,
    OrderItemsService,
    CanActivateViaAuthGuard,
    TRANSLATION_PROVIDERS,
    TranslateService,
    NotificationsService
  ], // TUKA SE STAVAAT SERVISI KOI NAJCESTO KOMUNICIRAAT SO BACKEND
  bootstrap: [AppComponent]
})
export class AppModule { }
