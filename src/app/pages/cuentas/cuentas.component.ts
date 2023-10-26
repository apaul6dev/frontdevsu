import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentasService } from './cuentas.service';
import { Cuenta } from '../model/cuenta';
import { MensajesService } from '../mensajes/mensajes.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  datos: Cuenta[] = [];
  datosTodo: Cuenta[] = [];
  terminoBusqueda: string = '';

  constructor(private cuentasService: CuentasService, private router: Router, private mensajesService: MensajesService) {

  }

  ngOnInit(): void {
    this.cuentasService.datosCambio.subscribe(rs => {
      this.datos = rs;
      this.datosTodo = rs;
    });

    this.cuentasService.listar().subscribe(rs => {
      console.log(rs);
      this.datos = rs;
      this.datosTodo = rs;
    });
  }

  eliminar(idCliente: any) {
    this.cuentasService.eliminar(idCliente).subscribe(data => {
      this.cuentasService.listar().subscribe(data2 => {
        this.cuentasService.datosCambio.next(data2);
        this.mensajesService.tipoMensaje.next({tipo:'exito', mensaje:'Cuenta eliminada correctamente!!'});
      });
    });
  }

  modificar(idCliente: any) {
    this.router.navigate(['/crearCuenta/', idCliente]);
  }

  movimientos(idCuenta: any) {
    this.router.navigate(['/movimientos/', idCuenta]);
  }

  buscarDatos() {
    if (this.terminoBusqueda) {
      this.datos = this.datos.filter((dato) =>
        dato.numeroCuenta.toString().includes(this.terminoBusqueda)
        || dato.tipoCuenta.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        || dato.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        || dato.cliente.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    } else {
      this.resetearTabla();
    }
  }
  resetearTabla() {
    this.datos = this.datosTodo
  }


}