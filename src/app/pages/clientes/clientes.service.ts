import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";
import { Subject } from "rxjs";
import { Cliente } from "../model/cliente";


@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    datosCambio = new Subject<Cliente[]>();

    url = `${HOST}/clientes`;

    constructor(private http: HttpClient) { }

    getClienteById(id: number) {
        return this.http.get<Cliente>(`${this.url}/${id}`);
    }

    listar() {
        return this.http.get<Cliente[]>(`${this.url}`);
    }

    create(cliente: Cliente) {
        return this.http.post(this.url, cliente);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

    modificar(cliente: Cliente) {
        return this.http.put(this.url, cliente);
    }


}