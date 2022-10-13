import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductoComponent } from './Gproducto/producto/producto.component';
import { ProdlistarComponent } from './Gproducto/prodlistar/prodlistar.component';
import { ProdadicionarComponent } from './Gproducto/prodadicionar/prodadicionar.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from 'src/MaterialModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegcontableComponent } from './GRegContable/regcontable/regcontable.component';
import { ListaregcontableComponent } from './GRegContable/listaregcontable/listaregcontable.component';
import { AdicionaregcontableComponent } from './GRegContable/adicionaregcontable/adicionaregcontable.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ProdlistarComponent,
    ProdadicionarComponent,
    RegcontableComponent,
    ListaregcontableComponent,
    AdicionaregcontableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule, ReactiveFormsModule, MaterialModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
