import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarClienteComponent } from './pages/clientes/registrar/registrar-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarCuentaComponent } from './pages/cuentas/registrar/registrar-cuenta.component';

@NgModule({
  declarations: [
    AppComponent, ClientesComponent, CuentasComponent, MovimientosComponent,
    ReportesComponent, RegistrarClienteComponent, RegistrarCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
