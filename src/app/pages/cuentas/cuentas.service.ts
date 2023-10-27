import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";
import { Subject } from "rxjs";
import { Cuenta } from "../model/cuenta";


@Injectable({
    providedIn: 'root'
})
export class CuentasService {
    datosCambio = new Subject<Cuenta[]>();

    url = `${HOST}/cuentas`;

    constructor(private http: HttpClient) { }

    getCuentaById(id: number) {
        return this.http.get<Cuenta>(`${this.url}/${id}`);
    }

    listar() {
        return this.http.get<Cuenta[]>(`${this.url}`);
    }

    create(cliente: Cuenta) {
        return this.http.post(this.url, cliente);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

    modificar(cliente: Cuenta) {
        return this.http.put(this.url, cliente);
    }

    getCuentasByCliente(id: number) {
        return this.http.get<Cuenta[]>(`${this.url}/getCuentasByCliente/${id}`);
    }

}