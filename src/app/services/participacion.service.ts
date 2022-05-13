import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {

  constructor(private http:HttpClient) { }

  //Esta función es para ver los intentos que ha hecho el usuario en el juego;
  verParticipacion(id_jugador:number){
    return this.http.get('http://localhost:3000/rondas/jugadorParticipado/'+id_jugador);
  }
}

//Interfaz para manipular la información de los intentos;
export interface participacion{
  nombre:string, 
  fecha_participa:string, 
  premioObtenido:string
}
