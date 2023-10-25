import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { CuentasService } from '../cuentas.service';
import { ClientesService } from '../../clientes/clientes.service';
import { Cuenta } from '../../model/cuenta';

@Component({
    selector: 'app-registrar-cuenta',
    templateUrl: './registrar-cuenta.component.html',
    styleUrls: ['./registrar-cuenta.component.scss']
})
export class RegistrarCuentaComponent implements OnInit {

    registroForm: FormGroup | any;
    // estadoGuardado = false;
    accion = "";

    tiposCuenta: string[] = ['Ahorro', 'Corriente'];

    listaClientes: Cliente[] = [];

    id = 0;

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
            this.listaClientes = rs;
        });

        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.initForm();
        });
    }

    private initForm(): void {
        if (this.id === 0) {
            this.accion = "Registro de Cuentas";
            let cuentaTmp!: Cuenta;
            this.buildForm(cuentaTmp);
        } else {
            this.accion = "Modificar Cuentas";
            this.cuentasService.getCuentaById(this.id).subscribe((cuenta: Cuenta) => {
                this.buildForm(cuenta);
            });
        }
    }

    private buildForm(cuenta: Cuenta): void {
        
        this.registroForm = this.formBuilder.group({
            numeroCuenta: [cuenta ? cuenta.numeroCuenta : '', [Validators.required]],
            tipoCuenta: [cuenta ? cuenta.tipoCuenta : '', [Validators.required]],
            saldoInicial: [cuenta ? cuenta.saldoInicial : '', [Validators.required]],
            estado: [cuenta ? cuenta.estado : '', [Validators.required]],
            idPersona: [cuenta ? cuenta.cliente.idPersona : '', [Validators.required]],

        }); 

    }


    submitRegistro() {
        console.log(this.registroForm.value);

        if (this.registroForm.valid) {
            const formData = this.registroForm.value;
        }
    }
}