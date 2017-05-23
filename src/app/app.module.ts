import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
import { UsersSignInComponent } from './users/users-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrdersComponent } from './orders/orders.component';

import { UsersService } from './users/users.service';
import { AuthService } from './users/auth.service';
import { OrdersService } from './orders/orders.service';
import { CanActivateViaAuthGuard } from './users/auth-guard.service';
import { SuppliersService } from './suppliers/suppliers.service';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserRegistrationComponent,
    UsersSignInComponent,
    WelcomeComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    UsersService,
    AuthService,
    OrdersService,
    SuppliersService,
    CanActivateViaAuthGuard
  ], // TUKA SE STAVAAT SERVISI KOI NAJCESTO KOMUNICIRAAT SO BACKEND
  bootstrap: [AppComponent]
})
export class AppModule { }
