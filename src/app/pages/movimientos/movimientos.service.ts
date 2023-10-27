import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";


@Injectable({
    providedIn: 'root'
})
export class MovimientosService {

    url = `${HOST}/movimientos`;

    constructor(private http: HttpClient) {

    }

    getMovimientosByCuenta(id: number) {
        return this.http.get<any[]>(`${this.url}/getAllByCuenta/${id}`);
    }

    create(movimiento: any) {
        return this.http.post(this.url, movimiento);
    }

    generateJSONReport(finicio: string, ffinal: string, idCuenta: number) {
        return this.http.get<any[]>(`${this.url}/generateJSONReport?finicial=${finicio}&ffinal=${ffinal}&idCuenta=${idCuenta}`);
    }
    generatePDFReport(finicio: string, ffinal: string, idCuenta: number) {
        return this.http.get<any>(`${this.url}/generatePDFReport?finicial=${finicio}&ffinal=${ffinal}&idCuenta=${idCuenta}`);
    }


}