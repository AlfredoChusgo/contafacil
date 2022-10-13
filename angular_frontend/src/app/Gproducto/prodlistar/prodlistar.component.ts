import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-prodlistar',
  templateUrl: './prodlistar.component.html',
  styleUrls: ['./prodlistar.component.scss']
})
export class ProdlistarComponent implements OnInit {
  productodata:any;
  //productdata!:productomodel[];

  constructor(private service:ProductoService, private dialog: MatDialog) { 
    this.LoadAll();
    this.service.Refreshrequired.subscribe( response =>{
      this.LoadAll();
    });
  }

  ngOnInit(): void {
  }

  //mostrarColumnas:string[]=["id","code","name","action"]

  LoadAll(){
    this.service.LoadAllProductos().subscribe(result=>{
      this.productodata=result;
    })
  }

  delete(id: any) {
    if (confirm("Eliminar Producto Permanentemente?")) {
      this.service.EliminarProducto(id).subscribe(result => {
        this.LoadAll(); 
      });
    }
  }

}
