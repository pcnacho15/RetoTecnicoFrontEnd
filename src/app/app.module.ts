import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Formularios
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MiParticipacionComponent } from './components/mi-participacion/mi-participacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HistoricoComponent,
    CuestionarioComponent,
    NavbarComponent,
    MiParticipacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
