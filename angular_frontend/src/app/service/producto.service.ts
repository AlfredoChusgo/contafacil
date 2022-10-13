import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 apiurl='https://conta-facil.mybluemix.net';
  private refreshrequired= new Subject<void>();
  constructor(private http:HttpClient) {   } 

get Refreshrequired(){
  return this.refreshrequired;
}

   LoadAllProductos():Observable<any>{
    return this.http.get(this.apiurl+'/product');
  }

  ProductoByCode(id:Number):Observable<any>{
    return this.http.get(this.apiurl+'/product/'+id);
  }
ar:any;
  SaveProducto(inputdata:any){
    return this.http.post(this.apiurl+'/product',inputdata).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }
  UpdateProducto(data:any){
    return this.http.post(this.apiurl+'/editproduct/',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }

  EliminarProducto(id:any){
    return this.http.delete(this.apiurl+'/product/'+id);
  }


}
