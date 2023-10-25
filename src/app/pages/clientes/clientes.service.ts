import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    datosCambio = new Subject<any>();

    url = `${HOST}/clientes`;

    constructor(private http: HttpClient) { }

    getClienteById(id: number) {
        return this.http.get<any>(`${this.url}/${id}`);
    }

    getAll() {
        return this.http.get<any[]>(`${this.url}`);
    }

    create(cliente:any) {
        return this.http.post(this.url, cliente);
    }

    eliminar(id:number){
        return this.http.delete(`${this.url}/${id}`);
    }

   

}