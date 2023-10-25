import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { CuentasService } from '../cuentas.service';
import { ClientesService } from '../../clientes/clientes.service';

@Component({
    selector: 'app-registrar-cuenta',
    templateUrl: './registrar-cuenta.component.html',
    styleUrls: ['./registrar-cuenta.component.scss']
})
export class RegistrarCuentaComponent implements OnInit {

    tipoCuentaSelected: string | any;
    registroForm: FormGroup | any;
    estadoGuardado = false;
    accion = "Registrar";

    tiposCuenta: string[] = ['Ahorro', 'Corriente'];

    listaClientes: Cliente[] = [];

    constructor(private route: ActivatedRoute, private cuentasService: CuentasService, private clientesService: ClientesService, private formBuilder: FormBuilder) {
        this.registroForm = this.formBuilder.group({
            numeroCuenta: new FormControl(''),
            tipoCuenta: new FormControl(''),
            saldoInicial: new FormControl(''),
            estado: new FormControl(''),
            idPersona: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.clientesService.listar().subscribe(rs => {
            console.log(rs);
            
            this.listaClientes = rs;
        });
    }

    submitRegistro() {
        console.log(this.registroForm.value);

        if (this.registroForm.valid) {
            const formData = this.registroForm.value;
        }
    }

    seleccionarOpcion() {
        console.log('Opción seleccionada:', this.tipoCuentaSelected);
    }
}