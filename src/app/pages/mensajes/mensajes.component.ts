import { Component, Input, OnInit } from "@angular/core";
import { MensajesService } from "./mensajes.service";

@Component({
    selector: 'app-mensajes',
    templateUrl: './mensajes.component.html',
    styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

    error = false;
    exito = false;

    constructor(private mensajesService: MensajesService) {

    }

    ngOnInit(): void {
        this.mensajesService.tipoMensaje.subscribe(rs => {
            if (rs === 'exito') {
                this.exito = true;
            } else if (rs === 'error') {
                this.error = true;
            } else {
                this.exito = false;
                this.error = false;
            }
            setTimeout(() => {
                this.exito = false;
            }, 2000);
        });

    }

}