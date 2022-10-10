import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdadicionarComponent } from './Gproducto/prodadicionar/prodadicionar.component';
import { ProdlistarComponent } from './Gproducto/prodlistar/prodlistar.component';
import { ProductoComponent } from './Gproducto/producto/producto.component';

const routes: Routes = [
  {path: 'producto',component:ProductoComponent,children:[
    {path:'',component:ProdlistarComponent},
    {path:'prodadicionar',component:ProdadicionarComponent},
    //{path:'prodeditar/:id',component:ProdadicionarComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
