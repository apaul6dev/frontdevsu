import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Subject } from 'rxjs';

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
        this.getAllClientes();
    }

    getAllClientes() {
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

}