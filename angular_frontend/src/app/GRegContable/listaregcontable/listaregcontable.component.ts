import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { RegContableService } from 'src/app/service/reg-contable.service';

@Component({
  selector: 'app-listaregcontable',
  templateUrl: './listaregcontable.component.html',
  styleUrls: ['./listaregcontable.component.scss']
})
export class ListaregcontableComponent implements OnInit {
  lregcontabledata:any;
  produtos:any;

  constructor(private servRegConta:RegContableService,private servProducto:ProductoService) {
    this.LoadAll();
    this.servRegConta.Refreshrequired.subscribe(
      response=>{
        this.LoadAll();
      }
    );
    this.CargarProductos();
   }

  ngOnInit(): void {
  }

  LoadAll(){
    this.servRegConta.LoadAllRegContable().subscribe(
      result=>{
        this.lregcontabledata=result;
        console.log(this.lregcontabledata);
      }
    )
  }

  CargarProductos(){
      this.servProducto.LoadAllProductos().subscribe(result =>{
        this.produtos =result;
      })
  }

  delete(id: any) {
    if (confirm("Eliminar Registro Contable Permanentemente?")) {
      this.servRegConta.EliminarRegContable(id).subscribe(result => {
        this.LoadAll();
      });
    }
  }

}
