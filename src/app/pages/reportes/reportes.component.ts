import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientosService } from '../movimientos/movimientos.service';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../model/cliente';
import { CuentasService } from '../cuentas/cuentas.service';
import { Cuenta } from '../model/cuenta';
import { MensajesService } from '../mensajes/mensajes.service';
import jsPDF from 'jspdf';
import { Buffer } from "buffer";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  reportForm: FormGroup | any;
  listaClientes: Cliente[] = [];
  listaCuentas: Cuenta[] = [];

  //listaMovimientosCliente: any[] = [];

  constructor(private fb: FormBuilder, private cuentasService: CuentasService, private mensajesService: MensajesService,
    private clientesService: ClientesService, private movimientosService: MovimientosService) {
    this.reportForm = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      idPersona: [null, [Validators.required]],
      idCuenta: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.clientesService.listar().subscribe(rs => {
      this.listaClientes = rs;
    });

    this.reportForm.setValidators(this.validateDates);
  }

  clientesSeleccionado() {
    const values = this.reportForm.value;
    const idCliente = values.idPersona;
    this.cuentasService.getCuentasByCliente(idCliente).subscribe(rs => {
      if (rs.length === 0) {
        this.mensajesService.tipoMensaje.next({ tipo: 'warning', mensaje: "El cliente no tiene cuentas activas" });
      }
      this.listaCuentas = rs;
    });
  }

  validateDates(formGroup: FormGroup) {
    const datos = formGroup.value;
    const fechaInicio = datos.fechaInicio;
    const fechaFin = datos.fechaFin;

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      return { dateMismatch: true };
    }

    return null;
  }

  downloadReport() {
    const datos = this.reportForm.value;
    const fechaInicio = this.formatDateToCustomFormat(datos.fechaInicio);
    const fechaFin = this.formatDateToCustomFormat(datos.fechaFin);
    const idCuenta = datos.idCuenta;

    console.log(fechaInicio, fechaFin, idCuenta);

    this.movimientosService.generateJSONReport(fechaInicio, fechaFin, idCuenta).subscribe(rs => {
      console.log('json', rs);
      // this.listaMovimientosCliente = rs;
      this.generatePDF(rs, 'JSON');
    });

    this.movimientosService.generatePDFReport(fechaInicio, fechaFin, idCuenta).subscribe(response => {
      console.log('base64', response);

      const base64String = response.base;

      // Decodifica la cadena Base64 a un objeto JSON
      const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');

      try {
        const jsonObject = JSON.parse(decodedString);
        console.log('JSON decodificado:', jsonObject);
        this.generatePDF(jsonObject, 'BASE64');
      } catch (error) {
        console.error('Error al analizar la cadena JSON:', error);
      }
    });

  }

  formatDateToCustomFormat(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  generatePDF(data: any[], nombre: string) {
    const header = [
      "Fecha",
      "Cliente",
      "Estado",
      "Tipo Cuenta",
      "Numero de Cuenta",
      "Saldo Inicial",
      "Movimiento",
      "Saldo Disponible",
    ]

    let datosReporte: any = [];

    data.forEach(dato => {
      datosReporte.push(
        {
          "Fecha": `${dato.fecha}`,
          "Cliente": `${dato.cliente}`,
          "Estado": `${dato.estado}`,
          "Tipo Cuenta": `${dato.tipo}`,
          "Numero Cuenta": `${dato.numeroCuenta}`,
          "Saldo Inicial": `${dato.saldoInicial}`,
          "Movimiento": `${dato.movimiento}`,
          "Saldo Disponible": `${dato.saldoDiponible}`
        }
      );
    });

    console.log(nombre, datosReporte);

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    doc.table(1, 1, datosReporte, header, { autoSize: true });

    doc.save(`${nombre}estadoCuenta.pdf`);
  }

}