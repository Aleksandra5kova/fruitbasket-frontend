import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list.component';
import { PostsFormComponent } from './posts-form.component';
import { ReactiveFormComponent } from './reactive-form.component';
// import {UsersComponent } from './users/users.component';

import { PostsService } from './posts.service';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostsFormComponent,
    ReactiveFormComponent,
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
    PostsService
  ], // TUKA SE STAVAAT SERVISI KOI NAJCESTO KOMUNICIRAAT SO BACKEND
  bootstrap: [AppComponent]
})
export class AppModule { }
