import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { MensajesService } from '../mensajes/mensajes.service';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

    datos: Cliente[] = [];
    datosTodo: Cliente[] = [];
    terminoBusqueda: string = '';

    constructor(private clientesService: ClientesService, private router: Router, private mensajesService: MensajesService) { }

    ngOnInit(): void {
        this.clientesService.datosCambio.subscribe(rs => {
            this.datos = rs;
            this.datosTodo = rs;
        });

        this.clientesService.listar().subscribe(rs => {
            this.datos = rs;
            this.datosTodo = rs;
        });
    }

    buscarDatos() {
        if (this.terminoBusqueda) {
            this.datos = this.datos.filter((dato) =>
                dato.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.identificacion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.direccion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.genero.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
                || dato.telefono.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
            );
        } else {
            this.resetearTabla();
        }
    }

    resetearTabla() {
        this.datos = this.datosTodo
    }

    eliminar(idCliente: any) {
        this.clientesService.eliminar(idCliente).subscribe(data => {
            this.clientesService.listar().subscribe(data2 => {
                this.clientesService.datosCambio.next(data2);
                this.mensajesService.tipoMensaje.next({tipo:'exito', mensaje:'Cliente eliminado correctamente!!'});
            });
        });
    }

    modificar(idCliente: any) {
        this.router.navigate(['/crearCliente/', idCliente]);
    }


}