import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import { RegContableService } from 'src/app/service/reg-contable.service';

@Component({
  selector: 'app-adicionaregcontable',
  templateUrl: './adicionaregcontable.component.html',
  styleUrls: ['./adicionaregcontable.component.scss']
})
export class AdicionaregcontableComponent implements OnInit {
  saveresp:any;
  message='';
  messageclass='';
  editdata:any;
  regContaID:any;
  productosData:any;
  datetime:any;

  constructor(private servRegConta:RegContableService, private servProducto:ProductoService, private route: ActivatedRoute) { 
    this.regContaID = this.route.snapshot.paramMap.get('id');
    if(this.regContaID != null && this.regContaID != 0){
      this.actualizarRegContable(this.productId);
    }
    this.cargarProductos();
    //this.datetime=formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a','eN-US');
  }


  ngOnInit(): void { 
  }

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    date: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    recordType: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    companyId: new FormControl('', Validators.required),
    productId: new FormControl('', Validators.required)
  });

  cargarProductos(){
    this.servProducto.LoadAllProductos().subscribe(
      result =>{
        this.productosData=result;
      }
    )

  }

  guardarRegistro() { 
   this.datetime=new Date().toISOString();//formatDate(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss a','eN-US');
   this.form.controls['date'].setValue(this.datetime);
    
    if (this.form.valid) {      
      if(this.regContaID == null || this.regContaID == undefined){
        console.log('not null'+this.regContaID);
        this.servRegConta.SaveRegistro(this.form.value).subscribe(
          result => { 
            if(result != null){    
                this.saveresp = result;             
                if (this.saveresp.message != 'added') {
                  this.message = "Guardado Correctamente."
                  this.messageclass = 'sucess'
                  this.limpiarform()
  
                } else if(this.saveresp.message == 'updated'){
                  this.message = "Actualizado correctamente."
                  this.messageclass = "sucess"
                }else{
                  this.message = "Falló al Guardar."
                  this.messageclass = 'error'
                }
            }else{
              this.message = "Falló al Guardar."
              this.messageclass = 'error'
            }  
        });
      }else{
        this.servRegConta.UpdateRegistro(this.form.value).subscribe(
          result => { 
            if(result != null){    
                this.saveresp = result;             
                if (this.saveresp.message != 'added') {
                  this.message = "Guardado Correctamente."
                  this.messageclass = 'sucess'
                  this.limpiarform()
  
                } else if(this.saveresp.message == 'updated'){
                  this.message = "Actualizado correctamente."
                  this.messageclass = "sucess"
                }else{
                  this.message = "Falló al Guardar."
                  this.messageclass = 'error'
                }
            }else{
              this.message = "Falló al Guardar."
              this.messageclass = 'error'
            }  
        });
      }
    } else {
      this.message = "Por favor ingresar datos válidos. Verifique..."
      this.messageclass = 'error'
    }
  }

  limpiarform(){
      this.form= new FormGroup({
        id: new FormControl(""),
        date: new FormControl(""),
        total: new FormControl(""),
        recordType: new FormControl(""),
        userId: new FormControl(""),
        companyId: new FormControl(""),
        productId: new FormControl("")
      })
  }

  actualizarRegContable(id:any){
    this.servRegConta.RegContableByCode(id).subscribe(data=>{
      this.editdata=data;
      if(this.editdata != null){
          this.form = new FormGroup({
            id: new FormControl(this.editdata.id),
            date: new FormControl(this.editdata.date),
            total: new FormControl(this.editdata.total),
            recordType: new FormControl(this.editdata.recordType),
            userId: new FormControl(this.editdata.userId),
            companyId: new FormControl(this.editdata.companyId),
            productId: new FormControl(this.editdata.productId)
          })
      } 
    })
}

  get date(){
    return this.form.get('date');
  }
  get total(){
    return this.form.get('total');
  }
  get recordType(){
    return this.form.get('recordType');
  }
  get userId(){
    return this.form.get('userId');
  }
  get companyId(){
    return this.form.get('companyId');
  }
  get productId(){
    return this.form.get('productId');
  }

}

