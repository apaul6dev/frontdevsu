import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";


@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    url = `${HOST}/clientes`;

    constructor(private http: HttpClient) { }

    getClienteById(id: number) {
        return this.http.get<any>(`${this.url}/${id}`);
      }

}