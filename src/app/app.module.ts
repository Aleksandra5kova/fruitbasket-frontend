import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list.component';
import { PostsFormComponent } from './posts-form.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
// import {UsersComponent } from './users/users.component';

import { PostsService } from './posts.service';
import { UsersService } from './users/users.service';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostsFormComponent,
    ReactiveFormComponent,
    UsersListComponent,
    UserRegistrationComponent
    // UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    PostsService,
    UsersService
  ], // TUKA SE STAVAAT SERVISI KOI NAJCESTO KOMUNICIRAAT SO BACKEND
  bootstrap: [AppComponent]
})
export class AppModule { }
