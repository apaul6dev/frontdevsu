import { Cliente } from "./cliente";

export class Cuenta {

    idCuenta: number | null;
    numeroCuenta: string;
    tipoCuenta: string;
    saldoInicial: number;
    estado: string;
    cliente: Cliente;

    constructor(
        idCuenta: number,
        numeroCuenta: string,
        tipoCuenta: string,
        saldoInicial: number,
        estado: string,
        cliente: Cliente
    ) {
        this.idCuenta = idCuenta;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldoInicial = saldoInicial;
        this.estado = estado;
        this.cliente = cliente;
    }

}
