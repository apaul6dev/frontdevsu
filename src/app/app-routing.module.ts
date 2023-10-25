import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { RegistrarClienteComponent } from './pages/clientes/registrar/registrar-cliente.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'crearCliente', component: RegistrarClienteComponent },
  
  { path: 'cuentas', component: CuentasComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'reportes', component: ReportesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
