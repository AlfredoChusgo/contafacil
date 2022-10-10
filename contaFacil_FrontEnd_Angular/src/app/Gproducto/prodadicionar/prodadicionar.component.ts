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
    code: new FormControl({ value: '', disabled: true }),
    name: new FormControl('', Validators.required),
   // email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
   // phone: new FormControl('', Validators.required),
   // designation: new FormControl('', Validators.required),
  });

  guardarProducto() { 
    if (this.formproducto.valid) {
      // console.log(this.formproducto.value);

      this.service.SaveProducto(this.formproducto.value).subscribe(result => {
        this.saveresp = result;
        if (this.saveresp.result == 'pass') {
          this.message = "Guardado Exitosamente"
          this.messageclass = 'sucess'

        } else {
          this.message = "Falló al Guardar"
          this.messageclass = 'error'
        }

      });
    } else {
      this.message = "Por favor ingresar datos válidos. Verifique..."
      this.messageclass = 'error'
    }
  }

  get name(){
    return this.formproducto.get('name');
  }

}
