import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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


  
}
