import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service'; 


@Component({
  selector: 'app-prodadicionar',
  templateUrl: './prodadicionar.component.html',
  styleUrls: ['./prodadicionar.component.scss']
})
export class ProdadicionarComponent implements OnInit {
  saveresp:any;
  message='';
  messageclass='';
  editdata:any;
  productoid:any;

  constructor( private service:ProductoService, private route: ActivatedRoute) {
    this.productoid=this.route.snapshot.paramMap.get('id');
    if (this.productoid != null && this.productoid != 0) {
      this.actualizarProducto(this.productoid);
    }
   }

  ngOnInit(): void {
  }

  formproducto = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
   // email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
   // phone: new FormControl('', Validators.required),
   // designation: new FormControl('', Validators.required),
  });

   guardarProducto() { 
    if (this.formproducto.valid) {
      if(this.productoid ==null){console.log('not null'+this.productoid)
        this.service.SaveProducto(this.formproducto.value).subscribe(
          result => { 
            if(result != null){    
                this.saveresp = result;             
                if (this.saveresp.message != 'added') {
                  this.message = "Guardado Correctamente."
                  this.messageclass = 'sucess'
                  this.limpiarFormProducto()
  
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
        this.service.UpdateProducto(this.formproducto.value).subscribe(
          result => { 
            if(result != null){    
                this.saveresp = result;             
                if (this.saveresp.message != 'added') {
                  this.message = "Guardado Correctamente."
                  this.messageclass = 'sucess'
                  this.limpiarFormProducto()
  
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

  actualizarProducto(id:any){
      this.service.ProductoByCode(id).subscribe(data=>{
        this.editdata=data;
        if(this.editdata != null){
            this.formproducto = new FormGroup({
              id: new FormControl(this.editdata.id),
              code: new FormControl(this.editdata.code),
              name: new FormControl(this.editdata.name)
            })
        } 
      })
  }

  limpiarFormProducto(){
    this.formproducto= new FormGroup({
      id: new FormControl(""),
      code: new FormControl(""),
      name: new FormControl(""),
    })

  }

  get name(){
    return this.formproducto.get('name');
  }

  get code(){
    return this.formproducto.get('code');
  }
}
