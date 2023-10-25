import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MensajesService {
    tipoMensaje = new Subject<any>();
}

