import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegContableService {

  private refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get Refreshrequired(){
    return this.refreshrequired;
  }

  LoadAllRegContable():Observable<any>{
    return this.http.get('/api/accountingRecord');
  }

  SaveRegistro(data:any){
    return this.http.post('/api/accountingRecord',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);
      })
    );
  }

  UpdateRegistro(data:any){
    return this.http.post('/api/editaccountingRecord/',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }


  
}
