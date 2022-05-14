import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/Jugador/Jugador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jugador:Jugador;
  participa = false;
  constructor(private jugadorService:JugadorService, private ruta:Router) { 
    this.jugador = new Jugador();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.participa = true;
    }
  }

  //Cierra la sesión actual del jugador
  salir(){
    this.jugadorService.cerrarSesion();
    location.reload();
  }

  //Se crea o se inicia la sesión del jugador dado el caso que ya se encuentre creado
  crearJugador(formRegistro:NgForm){
    if(formRegistro.invalid){
      Object.values( formRegistro.controls ).forEach( control => {
        control.markAsTouched();
      });
    }else{
      this.jugadorService.loguearJugador(this.jugador).subscribe((respuesta:any)=>{
        if(!respuesta){}else{
          this.jugadorService.loguearJugador(this.jugador).subscribe();
          this.ruta.navigateByUrl('/cuestionario');
        }
      }, (err)=>{
        this.jugadorService.crearJugador(this.jugador).subscribe();
        location.reload();
      });
    }
  }

}
