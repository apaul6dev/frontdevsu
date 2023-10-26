import { Component, OnInit } from "@angular/core";
import { MensajesService } from "./mensajes.service";

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  error: boolean = false;
  exito: boolean = false;
  warning: boolean = false;
  mensaje: { tipo: string, mensaje: string } = { tipo: '', mensaje: '' };

  constructor(private mensajesService: MensajesService) { }

  ngOnInit(): void {
    this.mensajesService.tipoMensaje.subscribe(rs => {
      console.log(rs);
      this.mensaje = rs;
      this.exito = rs.tipo === 'exito';
      this.error = rs.tipo === 'error';
      this.warning = rs.tipo === 'warning';

    console.log(this.error, this.exito, this.warning);
        
      setTimeout(() => this.cerrar(), 3000);
    });
  }

  cerrar() {
    this.exito = false;
    this.error = false;
    this.warning = false;
  }
}
