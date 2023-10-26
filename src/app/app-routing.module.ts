import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { RegistrarClienteComponent } from './pages/clientes/registrar/registrar-cliente.component';
import { RegistrarCuentaComponent } from './pages/cuentas/registrar/registrar-cuenta.component';
import { CrearMovimientosComponent } from './pages/movimientos/registrar/registrar-movimiento.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'crearCliente/:id', component: RegistrarClienteComponent },

  { path: 'cuentas', component: CuentasComponent },
  { path: 'crearCuenta/:id', component: RegistrarCuentaComponent },

  { path: 'movimientos/:id', component: MovimientosComponent },
  { path: 'crearMovimiento/:id', component: CrearMovimientosComponent },

  
  { path: 'reportes', component: ReportesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
