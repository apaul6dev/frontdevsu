import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

    datos: any[] = [];
    datosTodo: any[] = [];
    terminoBusqueda: string = '';

    constructor(private clientesService: ClientesService) { }

    ngOnInit(): void {
        this.clientesService.datosCambio.subscribe(rs => {
            this.datos = rs;
            this.datosTodo = rs;
        });

        this.clientesService.getAll().subscribe(rs => {
            this.datos = rs;
            this.datosTodo = rs;
        });
    }

    buscarDatos() {
        if (this.terminoBusqueda) {
            this.datos = this.datos.filter((dato) =>
                dato.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
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
            this.clientesService.getAll().subscribe(data2 => {
                this.clientesService.datosCambio.next(data2);
            });
        });
    }

    modificar(idCliente: any) {
        console.log('modificar', idCliente);
    }

}