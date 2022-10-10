import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service'; 


@Component({
  selector: 'app-prodadicionar',
  templateUrl: './prodadicionar.component.html',
  styleUrls: ['./prodadicionar.component.scss']
})
export class ProdadicionarComponent implements OnInit {

  constructor( private service:ProductoService) { }

  ngOnInit(): void {
  }
  saveresp:any;
  message='';
  messageclass='';
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
        this.service.SaveProducto(this.formproducto.value).subscribe(
          result => { console.log("result:"+result)
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
    } else {
      this.message = "Por favor ingresar datos válidos. Verifique..."
      this.messageclass = 'error'
    }
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
