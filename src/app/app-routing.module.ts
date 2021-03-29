import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './components/citas/citas.component';
import { GestionarCitasComponent } from './components/gestionar-citas/gestionar-citas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';

const routes: Routes = [
  { path: '', component: CitasComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'citas', component: CitasComponent, canActivate: [AuthGuard] },
  {
    path: 'citas/agregar',
    component: GestionarCitasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'citas/editar/:id',
    component: GestionarCitasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/editar/:id',
    component: GestionarProductosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/agregar',
    component: GestionarProductosComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
