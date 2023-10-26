import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../movimientos.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MensajesService } from '../../mensajes/mensajes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-registrar-movimiento',
    templateUrl: './registrar-movimiento.component.html',
    styleUrls: ['./registrar-movimiento.component.scss']
})
export class CrearMovimientosComponent implements OnInit {

    registroForm: FormGroup | any;
    tiposMovimiento: string[] = ['deposito', 'retiro'];
    id = 0;
    constructor(private route: ActivatedRoute, private mensajesService: MensajesService,
        private movimientosService: MovimientosService, private formBuilder: FormBuilder) {
        this.registroForm = this.formBuilder.group({
            idMovimiento: new FormControl(null),
            tipo: new FormControl(0),
            valor: new FormControl(0),
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

            let movimiento = {
                valor: +formData.valor,
                tipo: formData.tipo,
                cuenta: {
                    idCuenta: this.id
                }
            }
            console.log(movimiento);
            
            this.movimientosService.create(movimiento).subscribe(() => {
                this.mensajesService.tipoMensaje.next({ tipo: 'exito', mensaje: 'Movimiento guardado correctamente!!' });
                this.cleanForm();
            });
        } else {
            this.mensajesService.tipoMensaje.next({ tipo: 'error', mensaje: 'Datos incompletos!!' });
        }
    }

    cleanForm(): void {
        this.registroForm.reset();
    }

}