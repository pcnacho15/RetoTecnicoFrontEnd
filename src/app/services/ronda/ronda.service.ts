import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuestionario } from 'src/app/models/Cuestionario/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class RondaService {

  constructor(private http:HttpClient) { }

  //Esta función se crea con el propósito de traer las rondas de acuerdo la dificultad en qué se encuentre
  verRonda(dificultad:number){
    return this.http.get('http://localhost:3000/rondas/'+dificultad);
  }

  //Esta función es creada para obtener las opciones de respuesta de cada pregunta
  obtenerOpciones(id:number){
    return this.http.get('http://localhost:3000/rondas/opciones/'+id);
  }

  //Esta función se crea para registrar el intento de cada usuario
  insertarParticipacion(cuestionario:Cuestionario){
    return this.http.post('http://localhost:3000/rondas/participacion',cuestionario);
  }

}
