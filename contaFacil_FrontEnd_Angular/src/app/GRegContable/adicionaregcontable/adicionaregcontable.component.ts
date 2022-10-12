import { Component, OnInit } from '@angular/core';
import { RegContableservRegConta } from 'src/app/servRegConta/reg-contable.servRegConta';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private servRegConta:RegContableservRegConta) { }


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

  guardarProducto() { 
    if (this.form.valid) {
      if(this.regContaID ==null){console.log('not null'+this.regContaID)
        this.servRegConta.SaveRegistro(this.form.value).subscribe(
          result => { 
            if(result != null){    
                this.saveresp = result;             
                if (this.saveresp.message != 'added') {
                  this.message = "Guardado Correctamente."
                  this.messageclass = 'sucess'
                  //this.limpiarform()
  
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

}
