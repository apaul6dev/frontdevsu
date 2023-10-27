import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../../model/cliente';
import { MensajesService } from '../../mensajes/mensajes.service';

@Component({
    selector: 'app-registrar-cliente',
    templateUrl: './registrar-cliente.component.html',
    styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent implements OnInit {

    registroForm: FormGroup | any;
    estadoOperacion = "pendiente";
    id = 0;
    accion = '';

    tiposGenero: string[] = ['Masculino', 'Femenino'];
    tiposEstado: string[] = ['True', 'False'];

    constructor(private clientesService: ClientesService, private formBuilder: FormBuilder, private route: ActivatedRoute,
        private mensajesService: MensajesService) {
        this.registroForm = this.formBuilder.group({
            idPersona: new FormControl(null),
            contrasena: new FormControl(null),
            identificacion: new FormControl(null),
            nombre: new FormControl(null),
            direccion: new FormControl(null),
            edad: new FormControl(null,[Validators.min(1), Validators.max(150)]),
            estado: new FormControl(null),
            genero: new FormControl(null),
            telefono: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.initForm();
        });
    }

    private initForm(): void {
        if (this.id === 0) {
            this.accion = "Registro de Cientes";
            let clienteTmp!: Cliente;
            this.buildForm(clienteTmp);
        } else {
            this.accion = "Modificar Clientes";
            this.clientesService.getClienteById(this.id).subscribe((cliente: Cliente) => {
                this.buildForm(cliente);
            });
        }
    }

    private buildForm(cliente: Cliente): void {
        this.registroForm = this.formBuilder.group({
            idPersona: [cliente ? cliente.idPersona : null,],
            contrasena: [cliente ? cliente.contrasena : '', [Validators.required]],
            identificacion: [cliente ? cliente.identificacion : '', [Validators.required]],
            nombre: [cliente ? cliente.nombre : '', [Validators.required]],
            direccion: [cliente ? cliente.direccion : '', [Validators.required]],
            edad: [cliente ? cliente.edad : '', [Validators.required]],
            estado: [cliente ? cliente.estado : '', [Validators.required]],
            genero: [cliente ? cliente.genero : '', [Validators.required]],
            telefono: [cliente ? cliente.telefono : '', [Validators.required]],
        });
    }

    submitRegistro(): void {
        if (this.registroForm.valid) {
            const formData: Cliente = this.registroForm.value;
           // this.id === 0 ? formData.idPersona = null : formData.idPersona = this.id;
            const action = this.id === 0 ? 'creado' : 'modificado';

            const serviceMethod = this.id === 0 ? this.clientesService.create(formData) : this.clientesService.modificar(formData);

            serviceMethod.subscribe(() => {
                console.log(`${action}: `, formData);
                this.mensajesService.tipoMensaje.next({tipo:'exito', mensaje:'Cliente guardado correctamente!!'});
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
