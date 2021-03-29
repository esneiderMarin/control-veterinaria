import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/model/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.css']
})
export class GestionarProductosComponent implements OnInit {
  producto: Producto = {
    nombreProducto: '',
    valor: 0,
    stock: 0
  };

  id: string;

  constructor(
    private productosServicio: ProductoService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productosServicio.getProducto(this.id).subscribe(producto => {
      if (producto) this.producto = producto;
    });
  }

  guardar({ value, valid }: { value: Producto; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      // modificar la producto
      this.productosServicio.modificarProducto(value);
      this.router.navigate(['/productos']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar este producto?')) {
      this.productosServicio.eliminarProducto(this.producto);
      this.router.navigate(['/productos']);
    }
  }

  agregar({ value, valid }: { value: Producto; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show(
        'Por favor llenar el formulario de manera correcta',
        {
          cssClass: 'alert-danger',
          timeout: 4000
        }
      );
    } else {
      this.productosServicio.agregarProducto(value);
      this.router.navigate(['/productos']);
      //this.clienteForm.reset();
      //this.cerrarModal();
    }
  }
}
