import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../movimientos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from '../../mensajes/mensajes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-registrar-movimiento',
    templateUrl: './registrar-movimiento.component.html',
    styleUrls: ['./registrar-movimiento.component.scss']
})
export class CrearMovimientosComponent implements OnInit {
    
    id = 0;
    registroForm: FormGroup | any;
    tiposMovimiento: string[] = ['deposito', 'retiro'];
    
    constructor(
        private route: ActivatedRoute,
        private mensajesService: MensajesService,
        private movimientosService: MovimientosService,
        private formBuilder: FormBuilder
    ) {
        this.registroForm = this.formBuilder.group({
            idMovimiento: [null],
            tipo: [null, Validators.required],
            valor: [null, [Validators.required, Validators.min(0.01)]],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
        });
    }

    submitRegistro() {
        if (this.registroForm.valid) {
            const formData = this.registroForm.value;
            const movimiento = {
                valor: +formData.valor,
                tipo: formData.tipo,
                cuenta: { idCuenta: this.id }
            };

            this.movimientosService.create(movimiento).subscribe(() => {
                this.showSuccessMessage('Movimiento guardado correctamente!!');
                this.cleanForm();
            });
        } else {
            this.showErrorMessage('Datos incompletos!!');
        }
    }

    cleanForm(): void {
        this.registroForm.reset();
    }

    private showSuccessMessage(message: string) {
        this.mensajesService.tipoMensaje.next({ tipo: 'exito', mensaje: message });
    }

    private showErrorMessage(message: string) {
        this.mensajesService.tipoMensaje.next({ tipo: 'error', mensaje: message });
    }
}
