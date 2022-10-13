import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 // apiurl='http://localhost:3000/api';
  private refreshrequired= new Subject<void>();
  constructor(private http:HttpClient) {   } 

get Refreshrequired(){
  return this.refreshrequired;
}

   LoadAllProductos():Observable<any>{
    return this.http.get('/api/product');
  }

  ProductoByCode(id:Number):Observable<any>{
    return this.http.get('/api/product/'+id);
  }
ar:any;
  SaveProducto(inputdata:any){
    return this.http.post('/api/product',inputdata).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }
  UpdateProducto(data:any){
    return this.http.post('/api/editproduct/',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }

  EliminarProducto(id:any){
    return this.http.delete('/api/product/'+id);
  }


}
