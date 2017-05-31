import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
import { UsersSignInComponent } from './users/users-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/list/oder-list.component';
import { OrderFormComponent } from './orders/form/order-form.component';
import { MenuComponent } from './menu/menu.component';
import { DeleteDialogComponent } from './orders/list/delete-dialog/delete-dialog.component';

import { UsersService } from './users/users.service';
import { AuthService } from './users/auth.service';
import { OrdersService } from './orders/orders.service';
import { CanActivateViaAuthGuard } from './users/auth-guard.service';
import { SuppliersService } from './suppliers/suppliers.service';
import { TRANSLATION_PROVIDERS } from './translate/translations';
import { TranslateService } from './translate/translate.service';
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
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    routing
  ],
  providers: [
    UsersService,
    AuthService,
    OrdersService,
    SuppliersService,
    CanActivateViaAuthGuard,
    TRANSLATION_PROVIDERS,
    TranslateService
  ], // TUKA SE STAVAAT SERVISI KOI NAJCESTO KOMUNICIRAAT SO BACKEND
  bootstrap: [AppComponent]
})
export class AppModule { }
