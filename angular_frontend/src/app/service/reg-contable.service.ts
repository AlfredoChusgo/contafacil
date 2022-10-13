import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegContableService {
  apiurl='https://conta-facil.mybluemix.net';
  private refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get Refreshrequired(){
    return this.refreshrequired;
  }

  LoadAllRegContable():Observable<any>{
    return this.http.get(this.apiurl+'/accountingRecord');
  }

  SaveRegistro(data:any){
    return this.http.post(this.apiurl+'/accountingRecord',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);
      })
    );
  }

  UpdateRegistro(data:any){
    return this.http.post(this.apiurl+'/editaccountingRecord/',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }

  EliminarRegContable(id:any){
    return this.http.delete(this.apiurl+'/accountingRecord/'+id);
  }


  
}
