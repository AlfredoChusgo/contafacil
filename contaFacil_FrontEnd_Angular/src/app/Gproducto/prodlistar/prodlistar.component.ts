import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-prodlistar',
  templateUrl: './prodlistar.component.html',
  styleUrls: ['./prodlistar.component.scss']
})
export class ProdlistarComponent implements OnInit {
  productodata:any;
  constructor(private service:ProductoService) { 
    this.LoadAll();
  }

  ngOnInit(): void {
  }

  LoadAll(){
    this.service.LoadAllProductos().subscribe(result=>{
      this.productodata=result;
    })
  }

  delete(code:any){

  }

}
