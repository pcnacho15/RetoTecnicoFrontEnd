import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import Swal from 'sweetalert2';
import { JugadorService } from '../services/jugador.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(private jugadorService:JugadorService){}
  canActivate():boolean{
    /*
    Se valida que el usuario haya iniciado sesión, si no es así, no se le permitirá
    entrar a las rutas restringidas
    */
    if (!this.jugadorService.validarJugador()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debes llenar el fomulario antes de continuar',
        showConfirmButton: false,
        timer: 1500
      });
      return false
    }
    return true;
  }
  
}
