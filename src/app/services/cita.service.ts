import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita } from '../model/cita.model';

@Injectable()
export class CitaService {
  citasColeccion: AngularFirestoreCollection<Cita>;
  citaDoc: AngularFirestoreDocument<Cita>;
  citas: Observable<Cita[]>;
  cita: Observable<Cita>;

  constructor(private db: AngularFirestore) {
    // this.citasColeccion = db.collection('citas', ref =>
    //   ref.orderBy('nombre', 'asc').startAt('esneider')
    // );
    // this.citasColeccion = db.collection('clientes', ref =>
    //   ref.where('nombre', 'array-contains-any', 'Esneider')
    // );
    this.citasColeccion = db.collection('citas', ref =>
      ref
        .orderBy('prioridadesScore', 'desc')
        .orderBy('fechaIngreso', 'asc')
        .startAt(2000)
        .endAt(0)
    );
  }

  getCitas(): Observable<Cita[]> {
    // obtener los clientes
    this.citas = this.citasColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cita;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.citas;
  }

  getCitasEntreDosFechas(fechaInicio: string, fechaFinal: string) {
    let start = new Date(fechaInicio);
    var startDateFilter = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + 1,
      0o0,
      0o0,
      0o0
    ).getTime();
    let end = new Date(fechaFinal);
    var endDateFilter = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate() + 1,
      23,
      59,
      59
    ).getTime();
    this.citasColeccion = this.db.collection('citas', ref =>
      ref
        .where('fechaIngreso', '>', startDateFilter)
        .where('fechaIngreso', '<', endDateFilter)
    );
  }

  agregarCita(cita: Cita) {
    this.citasColeccion.add(cita);
  }

  getCita(id: string) {
    this.citaDoc = this.db.doc<Cita>(`citas/${id}`);
    this.cita = this.citaDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cita;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cita;
  }

  modificarCita(cita: Cita) {
    this.citaDoc = this.db.doc(`citas/${cita.id}`);
    this.citaDoc.update(cita);
  }

  eliminarCita(cita: Cita) {
    this.citaDoc = this.db.doc(`citas/${cita.id}`);
    this.citaDoc.delete();
  }
}
