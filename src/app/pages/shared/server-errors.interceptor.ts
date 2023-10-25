
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { MensajesService } from '../mensajes/mensajes.service';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private mensajesService: MensajesService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(3)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }
                }
            })).pipe(catchError((err) => {
                console.error(err);
                this.mensajesService.tipoMensaje.next('error');
                return EMPTY;
            }));
    }
}