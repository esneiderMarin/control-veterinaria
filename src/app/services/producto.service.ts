import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../model/producto.model';

@Injectable()
export class ProductoService {
  productosColeccion: AngularFirestoreCollection<Producto>;
  productoDoc: AngularFirestoreDocument<Producto>;
  productos: Observable<Producto[]>;
  producto: Observable<Producto>;

  constructor(private db: AngularFirestore) {
    // this.ProductosColeccion = db.collection('Productos', ref =>
    //   ref.orderBy('nombre', 'asc').startAt('esneider')
    // );
    // this.ProductosColeccion = db.collection('clientes', ref =>
    //   ref.where('nombre', 'array-contains-any', 'Esneider')
    // );
    // console.log('constructorService');
    this.productosColeccion = db.collection('productos', ref =>
      ref.orderBy('nombreProducto', 'asc')
    );
    // this.productosColeccion = db.collection('productos', ref =>
    //   ref
    //     .where('nombreProducto', '>=', 'p')
    //     .where('nombreProducto', '<=', 'p' + '~')
    // );
  }

  getProductos(): Observable<Producto[]> {
    // obtener los clientes
    console.log('oroor');
    this.productos = this.productosColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Producto;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.productos;
  }

  agregarProducto(producto: Producto) {
    this.productosColeccion.add(producto);
  }

  getProducto(id: string) {
    this.productoDoc = this.db.doc<Producto>(`productos/${id}`);
    this.producto = this.productoDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Producto;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.producto;
  }

  getProductoPorNombre(nombreProducto: string) {
    //console.log('por nombre');
    if (nombreProducto) {
      this.productosColeccion = this.db.collection('productos', ref =>
        ref
          .where('nombreProducto', '>=', nombreProducto)
          .where('nombreProducto', '<=', nombreProducto + '~')
      );
    } else {
      this.productosColeccion = this.db.collection('productos', ref =>
        ref.orderBy('nombreProducto', 'asc')
      );
    }

    console.log(this.productosColeccion);
  }

  modificarProducto(producto: Producto) {
    this.productoDoc = this.db.doc(`productos/${producto.id}`);
    this.productoDoc.update(producto);
  }

  eliminarProducto(producto: Producto) {
    this.productoDoc = this.db.doc(`productos/${producto.id}`);
    this.productoDoc.delete();
  }
}
