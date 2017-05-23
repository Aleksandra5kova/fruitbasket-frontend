import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SuppliersService{

     baseUrl="/api";

     constructor(private http: Http){}

     getSuppliers(){
         return this.http.get(`${this.baseUrl}/suppliers`).map((response) => {
             return response.json();
         });
     }
}