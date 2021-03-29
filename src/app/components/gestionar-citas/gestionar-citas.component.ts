import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';
import { Cita } from '../../model/cita.model';
import { CitaService } from '../../services/cita.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/model/producto.model';
@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.component.html',
  styleUrls: ['./gestionar-citas.component.css']
})
export class GestionarCitasComponent implements OnInit {
  cita: Cita = {
    nombreCliente: '',
    tipoMascota: '',
    fracturaYN: '',
    sangradoYN: '',
    inconscienteYN: '',
    caminaYN: '',
    prioridadesScore: 0
  };

  id: string;

  constructor(
    private citasServicio: CitaService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.citasServicio.getCita(this.id).subscribe(cita => {
      if (cita) this.cita = cita;
    });
  }

  guardar({ value, valid }: { value: Cita; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      value.prioridadesScore = this.calcularScore(value);
      // modificar la cita
      this.citasServicio.modificarCita(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar este cita?')) {
      this.citasServicio.eliminarCita(this.cita);
      this.router.navigate(['/']);
    }
  }

  agregar({ value, valid }: { value: Cita; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show(
        'Por favor llenar el formulario de manera correcta',
        {
          cssClass: 'alert-danger',
          timeout: 4000
        }
      );
    } else {
      value.fechaIngreso = Date.now();
      value.prioridadesScore = this.calcularScore(value);
      this.citasServicio.agregarCita(value);
      this.router.navigate(['/']);
      //this.clienteForm.reset();
      //this.cerrarModal();
    }
  }

  calcularScore(cita: Cita): number {
    return (cita.prioridadesScore =
      (cita.fracturaYN == 'Si' ? 4 : 0) +
      (cita.sangradoYN == 'Si' ? 3 : 0) +
      (cita.inconscienteYN == 'Si' ? 2 : 0) +
      (cita.caminaYN == 'Si' ? 1 : 0));
  }
}
