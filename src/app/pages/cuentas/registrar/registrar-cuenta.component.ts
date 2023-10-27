import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { CuentasService } from '../cuentas.service';
import { ClientesService } from '../../clientes/clientes.service';
import { Cuenta } from '../../model/cuenta';
import { MensajesService } from '../../mensajes/mensajes.service';

@Component({
    selector: 'app-registrar-cuenta',
    templateUrl: './registrar-cuenta.component.html',
    styleUrls: ['./registrar-cuenta.component.scss']
})
export class RegistrarCuentaComponent implements OnInit {

    registroForm: FormGroup | any;

    accion = "";

    tiposCuenta: string[] = ['Ahorro', 'Corriente'];
    tiposEstado: string[] = ['True', 'False'];

    listaClientes: Cliente[] = [];

    id = 0;

    constructor(private route: ActivatedRoute, private cuentasService: CuentasService, private mensajesService: MensajesService,
        private clientesService: ClientesService, private formBuilder: FormBuilder) {
        this.registroForm = this.formBuilder.group({
            idCuenta: new FormControl(null),
            numeroCuenta: new FormControl('',[Validators.min(1), Validators.max(999999)]),
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
            idCuenta: [cuenta ? cuenta.idCuenta : null],
            numeroCuenta: [cuenta ? cuenta.numeroCuenta : '', [Validators.required]],
            tipoCuenta: [cuenta ? cuenta.tipoCuenta : '', [Validators.required]],
            saldoInicial: [cuenta ? cuenta.saldoInicial : '', [Validators.required]],
            estado: [cuenta ? cuenta.estado : '', [Validators.required]],
            idPersona: [cuenta ? cuenta.cliente.idPersona : '', [Validators.required]],
        });
    }


    submitRegistro() {
        if (this.registroForm.valid) {
            const formData = this.registroForm.value;
            const action = this.id === 0 ? 'creado' : 'modificado';
            const cliente = new Cliente(+formData.idPersona, "", "", "", "", 0, "", "", "",);
            const cuenta = new Cuenta(formData.idCuenta, formData.numeroCuenta,
                formData.tipoCuenta, formData.saldoInicial, formData.estado, cliente);

            const serviceMethod = this.id === 0 ? this.cuentasService.create(cuenta) : this.cuentasService.modificar(cuenta);

            serviceMethod.subscribe(() => {
                console.log(`${action}: `, formData);
                this.mensajesService.tipoMensaje.next({tipo:'exito', mensaje:'Cuenta guardado correctamente!!'});
                this.cleanForm();
            });
        } else {
            this.mensajesService.tipoMensaje.next({tipo:'error', mensaje:'Datos incompletos!!'});
        }
    }

    cleanForm(): void {
        this.registroForm.reset();
    }
}