import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "../shared/constants";


@Injectable({
    providedIn: 'root'
})
export class ReportesService {

    url = `${HOST}`;

    constructor(private http: HttpClient) { }


}