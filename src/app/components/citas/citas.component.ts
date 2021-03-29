import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita.model';
import { CitaService } from 'src/app/services/cita.service';
import { FlashMessagesService } from 'flash-messages-angular';

import { DatePickerDirective } from 'ng2-date-picker';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  desdeFecha = '';
  hastaFecha = '';
  citas: Cita[];
  cita: Cita = {
    nombreCliente: '',
    tipoMascota: '',
    fracturaYN: '',
    sangradoYN: '',
    inconscienteYN: '',
    caminaYN: '',
    prioridadesScore: 0
  };

  constructor(
    private citasService: CitaService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.citasService.getCitas().subscribe(citas => {
      this.citas = citas;
    });
  }

  filtrarPorFechas() {
    if (this.desdeFecha && this.hastaFecha) {
      if (this.desdeFecha > this.hastaFecha) {
        this.flashMessages.show(
          'Por favor llenar el formulario de manera correcta',
          {
            cssClass: 'alert-danger',
            timeout: 4000
          }
        );
      } else {
        this.citasService.getCitasEntreDosFechas(
          this.desdeFecha,
          this.hastaFecha
        );
        this.citasService.getCitas().subscribe(citas => {
          this.citas = citas;
        });
      }
    }
  }

  atenderCita(cita: Cita) {
    cita.atendidoYN = 'Si';
    this.citasService.modificarCita(cita);
  }
}
