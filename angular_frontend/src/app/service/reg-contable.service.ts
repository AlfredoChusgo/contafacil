import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegContableService {
  apiurl='https://backend-expressjs-conta-facil.mybluemix.net';
  //apiurl='http://localhost:3000';
  private refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get Refreshrequired(){
    return this.refreshrequired;
  }

  LoadAllRegContable():Observable<any>{
    return this.http.get(this.apiurl+'/accountingRecord');
  }

  LoadAllRegContableByDate(startDate:Date,endDate:Date):Observable<any>{
    let stringStartDate:string = new Date(startDate).toISOString();
    let stringEndDate:string = new Date(endDate).toISOString();
    return this.http.get(this.apiurl+`/accountingRecords?startDate=${stringStartDate}&endDate=${stringEndDate}`);
  }

  RegContableByCode(id:Number):Observable<any>{
    return this.http.get(this.apiurl+'/accountingRecord/'+id);
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
    return this.http.put(this.apiurl+'/editaccountingRecord/',data).pipe(
      tap((data)=>{
        this.refreshrequired.next()
          console.log(data);        
      })
    );
  }

  EliminarRegContable(id:any){
    return this.http.delete(this.apiurl+'/accountingRecord/'+id);
  }

  GetExcelFileLink(startDate: Date, endDate: Date) {
    try {
      let stringStartDate: string = new Date(startDate).toISOString();
      let stringEndDate: string = new Date(endDate).toISOString();
      let url = this.apiurl + `/accountingRecordsExcel?startDate=${stringStartDate}&endDate=${stringEndDate}`;
      return url;
    } catch (error) {
      return "#";
    }

  }
  
}
