import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  apiurl='http://localhost:3000';
  constructor(private http:HttpClient) {


   }

   LoadAllProductos(){
    return this.http.get(this.apiurl+'/product');
  }

  ProductoByCode(code:any){
    return this.http.get(this.apiurl+'/product/'+code);
  }

  SaveProducto(inputdata:any){
    return this.http.post(this.apiurl+'/product',inputdata);
  }


}
