import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/model/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  producto: Producto = {
    nombreProducto: '',
    valor: 0,
    stock: 0
  };
  searchParams = '';
  timeout: any = null;

  constructor(
    private productosService: ProductoService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('hola');
    this.productosService.getProductos().subscribe(productos => {
      this.productos = productos;
      console.log(productos);
    });
  }

  venderProducto(producto: Producto) {
    // modificar la cita
    if (producto.stock > 0) {
      producto.stock--;
      this.productosService.modificarProducto(producto);
    }
  }

  setSearchParams(searchText: string) {
    this.searchParams = searchText;
  }

  handleSearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    if (event.charCode === 13) {
      this.productosService.getProductoPorNombre(this.searchParams);
      this.productosService.getProductos().subscribe(productos => {
        this.productos = productos;
        console.log(productos);
      });
    } else if (this.searchParams.length >= 3) {
      this.timeout = setTimeout(function() {
        $this.productosService.getProductoPorNombre($this.searchParams);
        $this.productosService.getProductos().subscribe(productos => {
          $this.productos = productos;
          console.log(productos);
        });
      }, 3000);
    }
  }
}
