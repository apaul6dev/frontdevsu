import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
    constructor(private clientesService: ClientesService) { }

    ngOnInit(): void {
        this.clientesService.getClienteById(1).subscribe(rs => {
            console.log(rs);
        });
    }

}