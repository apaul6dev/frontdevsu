import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes/mensajes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MovimientosService } from './movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  id = 0;
  datos: any[] = [];
  datosTodo: any[] = [];
  terminoBusqueda: string = '';

  constructor(
    private route: ActivatedRoute,
    private mensajesService: MensajesService,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.loadData();
    });
  }

  private loadData() {
    if (this.id === 0) {
      this.showWarningMessage('Debe seleccionar una cuenta en la pantalla de Cuentas');
      return;
    }

    this.movimientosService.getMovimientosByCuenta(this.id).subscribe(rs => {
      if (rs.length > 0) {
        this.mensajesService.tipoMensaje.next({ tipo: 'exito', mensaje: 'Movimientos recuperados correctamente!!' });
        this.datos = rs;
        this.datosTodo = rs;
      } else {
        this.showWarningMessage('No hay movimientos para mostrar');
      }
    });
  }

  buscarDatos() {
    if (this.terminoBusqueda) {
      this.datos = this.datosTodo.filter(dato => dato.tipo.toString().includes(this.terminoBusqueda));
    } else {
      this.resetearTabla();
    }
  }

  resetearTabla() {
    this.datos = this.datosTodo;
  }

  private showWarningMessage(message: string) {
    this.mensajesService.tipoMensaje.next({ tipo: 'warning', mensaje: message });
  }
}
