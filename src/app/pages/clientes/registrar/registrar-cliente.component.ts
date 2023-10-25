import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../../model/cliente';

@Component({
    selector: 'app-registrar-cliente',
    templateUrl: './registrar-cliente.component.html',
    styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent implements OnInit {
    registroForm: FormGroup | any;
    estadoGuardado = false;
    id = 0;

    constructor(private clientesService: ClientesService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
        this.registroForm = this.formBuilder.group({
            contrasena: new FormControl(''),
            identificacion: new FormControl(''),
            nombre: new FormControl(''),
            direccion: new FormControl(''),
            edad: new FormControl(''),
            estado: new FormControl(''),
            genero: new FormControl(''),
            telefono: new FormControl('')
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
            let clienteTmp!: Cliente;
            this.buildForm(clienteTmp);
        } else {
            this.clientesService.getClienteById(this.id).subscribe((cliente: Cliente) => {
                this.buildForm(cliente);
            });
        }
    }

    private buildForm(cliente: Cliente): void {
        this.registroForm = this.formBuilder.group({
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
            this.id === 0 ? formData.idPersona = null : formData.idPersona = this.id;
            const action = this.id === 0 ? 'creado' : 'modificado';

            const serviceMethod = this.id === 0 ? this.clientesService.create(formData) : this.clientesService.modificar(formData);

            serviceMethod.subscribe(() => {
                console.log(`${action}: `, formData);
                this.estadoGuardado = true;
                this.cleanForm();
            });
        }
    }

    cleanForm(): void {
        this.registroForm.reset();
    }
}
