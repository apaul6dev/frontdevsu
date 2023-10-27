import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientosService } from '../movimientos/movimientos.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  reportForm: FormGroup | any;

  constructor(private fb: FormBuilder, private movimientosService:MovimientosService) {
    this.reportForm = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.reportForm.setValidators(this.validateDates);
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
   
    console.log(fechaInicio,fechaFin);

    this.movimientosService.generateJSONReport(fechaInicio, fechaFin).subscribe(rs=>{
      console.log('json', rs);
      
    });
  
    this.movimientosService.generatePDFReport(fechaInicio, fechaFin).subscribe(rs=>{
      console.log('base64', rs);
    }); 
  }

  formatDateToCustomFormat(dateString:string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}