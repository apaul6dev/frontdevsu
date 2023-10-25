import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-regisrar-clientes',
    templateUrl: './registrar-cliente.component.html',
    styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent implements OnInit {

    registroForm: FormGroup | any;

    estadoGuardado = false;

    constructor(private clientesService: ClientesService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.registroForm = this.formBuilder.group({
            contrasena: ['', Validators.required],
            identificacion: ['', Validators.required],
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            edad: ['', Validators.required],
            estado: ['', Validators.required],
            genero: ['', Validators.required],
            telefono: ['', Validators.required]
        });

    }

    submitRegistro() {
        if (this.registroForm.valid) {
            const formData = this.registroForm.value;
            console.log('new', formData);
            this.clientesService.create(formData).subscribe(rs => {
                console.log('creado: ', rs);
                this.estadoGuardado = true;
                this.cleanForm();
            });

        }
    }

    cleanForm(){
        this.registroForm.reset();
    }


}