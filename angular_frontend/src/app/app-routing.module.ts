import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdadicionarComponent } from './Gproducto/prodadicionar/prodadicionar.component';
import { ProdlistarComponent } from './Gproducto/prodlistar/prodlistar.component';
import { ProductoComponent } from './Gproducto/producto/producto.component';
import { AdicionaregcontableComponent } from './GRegContable/adicionaregcontable/adicionaregcontable.component';
import { ListaregcontableComponent } from './GRegContable/listaregcontable/listaregcontable.component';
import { RegcontableComponent } from './GRegContable/regcontable/regcontable.component';

const routes: Routes = [
  {path: 'producto',component:ProductoComponent,children:[
    {path:'',component:ProdlistarComponent},
    {path:'prodadicionar',component:ProdadicionarComponent},
    {path:'prodeditar/:id',component:ProdadicionarComponent},
  ]},
  {path: 'regcontable',component:RegcontableComponent,children:[
    {path:'',component:ListaregcontableComponent},
    {path:'addregistrocontable',component:AdicionaregcontableComponent},
    {path:'regeditar/:id',component:AdicionaregcontableComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
