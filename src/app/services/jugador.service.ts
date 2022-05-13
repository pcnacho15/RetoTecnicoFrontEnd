import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Jugador } from '../models/Jugador/Jugador';
import { map } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private usuarioToken:any = null;
  private jugador:Jugador = {
    id_jugador:0,
    nombre:"Cristian",
    apellido:"Martinez",
    premio:0
  }
  constructor(private http:HttpClient) {
    this.leerToken();
   }
  
   //Esta función es para traer todos los jugadores que han ingresado al juego
  listadoJugadores(){
    return this.http.get('http://localhost:3000/user');
  }
  //Esta función es para validar si el jugador tiene la sesión iniciada
  validarJugador(){
    if (localStorage.getItem('token')) {
      return true
    }
    return false
  }
  //Esta función es para eliminar los tokens creados para la ronda del jugador
  eliminarTokens(){
    localStorage.removeItem('ronda');
    localStorage.removeItem('premio');
  }

  //Esta función es para eliminar todas sesiones del usuario
  cerrarSesion(){
    localStorage.removeItem('ronda');
    localStorage.removeItem('premio');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  //Esta función es para registrar un jugador
  crearJugador(jugador:Jugador){
    return this.http.post('http://localhost:3000/user/registro', jugador)
    .pipe(map((token:any) =>{
      this.guardarToken(token['token']);
      return decode(token['token']);
    }));
  }

  //Esta función es para iniciar sesión de un jugador registrado
  loguearJugador(jugador:Jugador){
    return this.http.post('http://localhost:3000/user/loguear', jugador)
    .pipe(map((token:any) =>{
      this.guardarToken(token['token']);
      return decode(token['token']);
    }));
  }

  //Esta función es para actualizar el premio más actual de ha obtenido el jugador
  actualizarPremio(jugador:Jugador){
    return this.http.put('http://localhost:3000/user/premio',jugador);
  }

  //Acá guardamos la sesión del usuario
  private guardarToken(idToken:string){
    this.usuarioToken = idToken;
    const {id_jugador, nombre, apellido}:any = decode(this.usuarioToken);
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', nombre);
    localStorage.setItem('id', id_jugador);
  }

  //Acá leemos la sesión que se ha creado
  leerToken(){
    if (localStorage.getItem('token')) {
      this.usuarioToken = localStorage.getItem('token');
    }else{
      this.usuarioToken = '';
    }
  }


}
