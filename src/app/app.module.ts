import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { HammerModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { IgxDatePickerModule } from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitaService } from './services/cita.service';

import { HeaderComponent } from './components/header/header.component';
import { CitasComponent } from './components/citas/citas.component';
import { GestionarCitasComponent } from './components/gestionar-citas/gestionar-citas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoService } from './services/producto.service';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CitasComponent,
    GestionarCitasComponent,
    ProductosComponent,
    GestionarProductosComponent,
    LoginComponent,
    NoEncontradoComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firestore),
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),

    // AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule
    // BrowserAnimationsModule,
    // HammerModule,
    // IgxDatePickerModule
  ],
  providers: [
    CitaService,
    ProductoService,
    LoginService,
    AuthGuard,
    { provide: SETTINGS, useValue: {} }
    // { provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
